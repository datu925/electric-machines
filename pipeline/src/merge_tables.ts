import { program } from "commander";

import fs = require("node:fs/promises");
import path = require("node:path");

import { Table, filterTables, mergeTablesByModelNumber } from "./table_merger";
import { glob } from "glob";
import { retrieveMetadata } from "./metadata";

const SPECS_FILE_BASE = "../data/";
const INPUT_SUBDIR = "llm/";
const OUTPUT_SUBDIR = "merged/";
const RUNS = "runs/";

program.requiredOption(
  "-f, --folders <folders...>",
  "Name of folder(s) under incentives_data/ where llm data is located."
);

program.parse();

async function main() {
  const opts = program.opts();
  for (const topFolder of opts.folders) {
    const folders = await glob(
      path.join(SPECS_FILE_BASE, topFolder, "**", INPUT_SUBDIR),
      { ignore: path.join(SPECS_FILE_BASE, RUNS) }
    );
    for (const inputFolder of folders) {
      const applianceFolder = path.dirname(inputFolder);
      const metadata = await retrieveMetadata(applianceFolder);
      const datalessFiles: string[] = [];
      let tables: Table[] = [];
      for (const file of await fs.readdir(inputFolder)) {
        const llmFilePath = path.join(inputFolder, file);
        if (!file.endsWith(".json")) continue;
        const llm_output = JSON.parse(
          await fs.readFile(llmFilePath, {
            encoding: "utf8",
          })
        );

        if (llm_output.length == 0) {
          console.log(`Skipping ${llmFilePath} because it is empty`);
          continue;
        }
        if ("data" in llm_output) {
          if (Array.isArray(llm_output["data"])) {
            tables = tables.concat(llm_output["data"]);
          } else if (Object.keys(llm_output["data"]).length === 0) {
            // Skip – empty object is not uncommon
          } else {
            console.log(`Unable to parse llm output: ${llm_output["data"]}`);
          }
        } else {
          datalessFiles.push(llmFilePath);
        }
      }

      const outputFolder = path.join(applianceFolder, OUTPUT_SUBDIR);
      await fs.mkdir(outputFolder, { recursive: true });
      const merged = mergeTablesByModelNumber(tables, metadata.brand);
      await fs.writeFile(
        path.join(outputFolder, "merged.json"),
        JSON.stringify(merged, null, 2) + "\n",
        "utf-8"
      );
      const filtered = filterTables(merged);
      await fs.writeFile(
        path.join(outputFolder, "filtered.json"),
        JSON.stringify(filtered, null, 2) + "\n",
        "utf-8"
      );
      await fs.writeFile(
        path.join(outputFolder, "dataless_files.json"),
        JSON.stringify(datalessFiles, null, 2) + "\n",
        "utf-8"
      );
    }
  }
}

main();
