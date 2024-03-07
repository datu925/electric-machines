import { program, Option, OptionValues } from "commander";

import fs = require("node:fs/promises");
import path = require("node:path");

import { SYSTEM, EXAMPLE_1_INPUT, EXAMPLE_1_OUTPUT } from "./prompt";

import { GptWrapper } from "./gpt_wrapper";
import { Specs, IdentifierToSpecs, IdentifierToModels } from "./schemas";
import { filterTables, mergeTablesByModelNumber } from "./table_merger";
import { glob } from "glob";

const SPECS_FILE_BASE = "../data/";
const TABLES_SUBDIR = "tables/";
const RUNS = "runs/";
const MODEL_FAMILY = "gpt"; // eventually support more options

program
  .requiredOption(
    "-f, --folders <folders...>",
    "Name of folder(s) under incentives_data/ where text data is located."
  )
  .option(
    "-w, --wait <duration_ms>",
    "How long to wait in ms between requests to avoid rate limiting"
  );

program.parse();

// We get some table output that is truly empty; filter these out.
function isEmptyTable(json: object[]): boolean {
  for (const row of json) {
    for (const val of Object.values(row)) {
      if (val !== "") return false;
    }
  }
  return true;
}

async function main() {
  const opts = program.opts();

  const allPromises: Promise<void>[] = [];
  const output: IdentifierToSpecs = {};
  const final: IdentifierToModels = {};

  const droppedFiles: string[] = [];
  for (const topFolder of opts.folders) {
    const folders = await glob(
      path.join(SPECS_FILE_BASE, topFolder, "**", TABLES_SUBDIR),
      { ignore: path.join(SPECS_FILE_BASE, RUNS) }
    );
    for (const tablesFolder of folders) {
      const folder = path.dirname(tablesFolder);
      const folderPromises: Promise<void>[] = [];
      let folderSpecs: Specs[] = [];
      const files = await fs.readdir(tablesFolder);
      for (const file of files) {
        const jsonFilePath = path.join(tablesFolder, file);
        if (!file.endsWith(".json") || file.endsWith("_llm.json")) continue;
        const json = JSON.parse(
          await fs.readFile(jsonFilePath, {
            encoding: "utf8",
          })
        );

        if (json.length == 0 || isEmptyTable(json)) {
          console.log(`Skipping ${jsonFilePath} because it is empty`);
          continue;
        }

        if (opts.wait) {
          await new Promise((f) => setTimeout(f, +opts.wait));
        }

        console.log(`Querying ${MODEL_FAMILY} with ${jsonFilePath}`);
        const gpt_wrapper = new GptWrapper(MODEL_FAMILY);
        const queryFunc = gpt_wrapper.queryGpt.bind(gpt_wrapper);
        const promise = queryFunc(JSON.stringify(json), SYSTEM, [
          [EXAMPLE_1_INPUT, EXAMPLE_1_OUTPUT],
        ]).then(async (msg: string) => {
          if (msg == "") return;
          console.log(`Got response from ${jsonFilePath}`);
          try {
            let response = JSON.parse(msg);

            output[jsonFilePath] = response;
            if ("data" in response) {
              const data = response["data"];
              folderSpecs = folderSpecs.concat(
                Array.isArray(data) ? data : [data]
              );
            }
            await fs.writeFile(
              jsonFilePath.replace(".json", "_llm.json"),
              JSON.stringify(response, null, 2),
              {
                encoding: "utf-8",
                flag: "w",
              }
            );
          } catch (error) {
            console.error(`Error parsing json: ${error}, ${msg}`);
            droppedFiles.push(jsonFilePath);
          }
        });
        allPromises.push(promise);
        folderPromises.push(promise);
      }
      Promise.allSettled(folderPromises).then(async () => {
        const merged = mergeTablesByModelNumber(folderSpecs);
        await fs.writeFile(
          path.join(folder, "merged.json"),
          JSON.stringify(merged)
        );
        const filtered = filterTables(merged);
        final[folder] = filtered;
        await fs.writeFile(
          path.join(folder, "filtered.json"),
          JSON.stringify(filtered)
        );
      });
    }
  }
  await Promise.allSettled(allPromises).then(async () => {
    const ts = Date.now();
    const summaryDir = path.join(SPECS_FILE_BASE, RUNS, ts.toString());
    fs.mkdir(summaryDir);
    await fs.writeFile(
      path.join(summaryDir, "all_output.json"),
      JSON.stringify(output)
    );
    await fs.writeFile(
      path.join(summaryDir, "final.json"),
      JSON.stringify(final)
    );
    if (droppedFiles.length > 0) {
      await fs.writeFile(
        path.join(summaryDir, "dropped_files.json"),
        JSON.stringify(droppedFiles)
      );
    }
  });
}

main();
