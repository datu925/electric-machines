import { program } from "commander";

import fs = require("node:fs/promises");
import path = require("node:path");

import {
  renderSystemPrompt,
  REFORMAT_EXAMPLE_1_INPUT,
  REFORMAT_EXAMPLE_1_OUTPUT,
  TABLE_REFORMAT_PROMPT,
} from "./prompts";

import { GptWrapper } from "./gpt_wrapper";
import { glob } from "glob";
import { APPLIANCE_TYPES } from "../../backend/schema/metadata";
import {
  HEAT_PUMP_DRYER_METADATA,
  HEAT_PUMP_METADATA,
  HEAT_PUMP_WATER_HEATER_METADATA,
  SpecsMetadata,
} from "./schemas";
import { ModelGeneratedAppliance } from "../../backend/schema/appliance";
import { retrieveMetadata } from "./metadata";

const SPECS_FILE_BASE = "../data/";
const INPUT_SUBDIR = "tables/";
const OUTPUT_SUBDIR = "reformatted/";
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
  const droppedFiles: string[] = [];
  for (const topFolder of opts.folders) {
    const folders = await glob(
      path.join(SPECS_FILE_BASE, topFolder, "**", INPUT_SUBDIR),
      { ignore: path.join(SPECS_FILE_BASE, RUNS) }
    );
    for (const inputFolder of folders) {
      const applianceFolder = path.dirname(inputFolder);
      const outputFolder = path.join(applianceFolder, OUTPUT_SUBDIR);
      await fs.mkdir(outputFolder, { recursive: true });
      const folderPromises: Promise<void>[] = [];
      for (const file of await fs.readdir(inputFolder)) {
        const tableFilePath = path.join(inputFolder, file);
        if (!file.endsWith(".json")) continue;
        const table = JSON.parse(
          await fs.readFile(tableFilePath, {
            encoding: "utf8",
          })
        );

        if (table.length == 0 || isEmptyTable(table)) {
          console.log(`Skipping ${tableFilePath} because it is empty`);
          continue;
        }

        if (opts.wait) {
          await new Promise((f) => setTimeout(f, +opts.wait));
        }

        const metadata = await retrieveMetadata(applianceFolder);
        if (!("applianceType" in metadata)) {
          throw new Error("applianceType not set in metadata");
        }
        const applianceType = metadata.applianceType;

        let modelMetadata: SpecsMetadata<ModelGeneratedAppliance>;
        if (applianceType === APPLIANCE_TYPES.heat_pump) {
          modelMetadata = HEAT_PUMP_METADATA;
        } else if (applianceType === APPLIANCE_TYPES.heat_pump_water_heater) {
          modelMetadata = HEAT_PUMP_WATER_HEATER_METADATA;
        } else if (applianceType === APPLIANCE_TYPES.heat_pump_dryer) {
          modelMetadata = HEAT_PUMP_DRYER_METADATA;
        } else {
          throw new Error(
            "No model metadata configured for this appliance type"
          );
        }

        console.log(`Querying ${MODEL_FAMILY} with ${tableFilePath}`);
        const gpt_wrapper = new GptWrapper(MODEL_FAMILY);
        const queryFunc = gpt_wrapper.queryGpt.bind(gpt_wrapper);
        const promise = queryFunc(
          JSON.stringify(table),
          TABLE_REFORMAT_PROMPT,
          [[REFORMAT_EXAMPLE_1_INPUT, REFORMAT_EXAMPLE_1_OUTPUT]]
        ).then(async (msg: string) => {
          if (msg == "") return;
          console.log(`Got response from ${tableFilePath}`);
          try {
            let response = JSON.parse(msg);
            await fs.writeFile(
              path.join(outputFolder, file),
              JSON.stringify(response, null, 2),
              {
                encoding: "utf-8",
                flag: "w",
              }
            );
          } catch (error) {
            console.error(`Error parsing json: ${error}, ${msg}`);
            droppedFiles.push(tableFilePath);
          }
        });
        allPromises.push(promise);
        folderPromises.push(promise);
      }
    }
  }
  await Promise.allSettled(allPromises).then(async () => {
    const ts = Date.now();
    const summaryDir = path.join(SPECS_FILE_BASE, RUNS, ts.toString());
    await fs.mkdir(summaryDir, { recursive: true });
    if (droppedFiles.length > 0) {
      await fs.writeFile(
        path.join(summaryDir, "dropped_files.json"),
        JSON.stringify(droppedFiles)
      );
    }
  });
}

main();
