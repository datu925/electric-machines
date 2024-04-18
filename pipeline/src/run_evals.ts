import { program, Option } from "commander";

import fs = require("node:fs/promises");
import path = require("node:path");

import { GptWrapper } from "./gpt_wrapper";
import { Differ, Diff, Report } from "./differ";
import { glob } from "glob";
import { Appliance } from "../../backend/schema/appliance";

const SPECS_FILE_BASE = "../data";
// TODO: we might be able to read for corrected/ instead.
// Though maybe we want the metadata.
const INPUT_SUBDIR = "validated/";
const RUNS = "runs/";

program
  .requiredOption(
    "-f, --folders <folders...>",
    "Name of folder(s) under incentives_data/ where text data is located."
  )
  .addOption(
    new Option(
      "-m, --model_family <model_family>",
      "Name of model family to use for model-grading"
    )
      .choices(["gpt4", "gpt"])
      .default("gpt")
  );

program.parse();

async function main() {
  const opts = program.opts();

  const promises: Promise<void>[] = [];
  const diffs: Diff[] = [];
  const gpt_wrapper = new GptWrapper(opts.model_family);
  const queryFunc = gpt_wrapper.queryGpt.bind(gpt_wrapper);
  const differ: Differ = new Differ(queryFunc);

  for (const topFolder of opts.folders) {
    const folders = await glob(
      path.join(SPECS_FILE_BASE, topFolder, "**", INPUT_SUBDIR),
      { ignore: path.join(SPECS_FILE_BASE, RUNS) }
    );
    for (const inputFolder of folders) {
      const applianceFolder = path.dirname(inputFolder);

      // check readiness – do we have both a golden and validated?
      const goldenFile = path.join(applianceFolder, "golden.json");
      let goldenData: Appliance[];
      try {
        goldenData = JSON.parse(
          await fs.readFile(goldenFile, { encoding: "utf8" })
        );
      } catch (err) {
        console.log(`No golden found for: ${applianceFolder}`);
        continue;
      }

      // read both valid and invalid
      const allRecords = [];
      for (const file of await fs.readdir(inputFolder)) {
        const records: Appliance[] = JSON.parse(
          await fs.readFile(path.join(inputFolder, file), { encoding: "utf-8" })
        );
        if (records.length === 0) continue;
        if (file === "invalid.json") {
          const noErrors = records.map((record: Appliance) => {
            if ("errors" in record) {
              delete record["errors"];
            }
            return record;
          });
          allRecords.push(...noErrors);
        }
      }

      const promise = differ
        .compareData(applianceFolder, goldenData, allRecords)
        .then((diff) => {
          diffs.push(...diff);
        })
        .catch((err) => {
          console.log(`diffing error: ${err}`);
        });
      promises.push(promise);
    }

    await Promise.allSettled(promises).then(async () => {
      const runId = Date.now().toString();
      const outputDir = path.join(SPECS_FILE_BASE, RUNS, runId);
      await fs.mkdir(outputDir);
      console.log(`Final diffs and report written to ${outputDir}`);
      await fs.writeFile(
        path.join(outputDir, "diff.json"),
        JSON.stringify(diffs, null, 2) + "\n",
        {
          encoding: "utf-8",
          flag: "w",
        }
      );

      const report: Report = differ.createReport(diffs);
      differ.writeReport(report, path.join(outputDir, "report.csv"));
    });
  }
}

main();
