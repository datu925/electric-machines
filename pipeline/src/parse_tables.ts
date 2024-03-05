import { program, Option, OptionValues } from "commander";

import fs = require("node:fs/promises");
import path = require("node:path");

import { SYSTEM, EXAMPLE_1_INPUT, EXAMPLE_1_OUTPUT } from "./prompt";

import { GptWrapper } from "./gpt_wrapper";
import { Specs, IdentifierToSpecs } from "./schemas";
import { mergeTablesByModelNumber } from "./table_merger";

const SPECS_FILE_BASE = "../data/";
const TABLES_SUBDIR = "tables/";
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

  const droppedFiles: string[] = [];
  for (const folder of opts.folders) {
    const folderPromises: Promise<void>[] = [];
    let folderSpecs: Specs[] = [];
    const files = await fs.readdir(
      path.join(SPECS_FILE_BASE, folder, TABLES_SUBDIR)
    );
    for (const file of files) {
      const jsonFilePath = path.join(
        SPECS_FILE_BASE,
        folder,
        TABLES_SUBDIR,
        file
      );
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
          // TODO: validate LLM output once we have a schema.
          let response = JSON.parse(msg);
          // if (!(Symbol.iterator in Object(records))) {
          //   records = [records];
          // }

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
      console.log(folderSpecs);
      const merged = mergeTablesByModelNumber(folderSpecs);
      await fs.writeFile(
        path.join(SPECS_FILE_BASE, folder, "merged.json"),
        JSON.stringify(merged)
      );
    });
  }

  await Promise.allSettled(allPromises).then(async () => {
    await fs.writeFile(
      path.join(SPECS_FILE_BASE, "all_output.json"),
      JSON.stringify(output)
    );
    if (droppedFiles.length > 0) {
      await fs.writeFile(
        path.join(SPECS_FILE_BASE, "dropped_files.json"),
        JSON.stringify(droppedFiles)
      );
    }
  });
}

main();
