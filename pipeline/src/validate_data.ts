import Ajv, { ValidateFunction } from "ajv";
import { SomeJSONSchema } from "ajv/dist/types/json-schema";
import { program } from "commander";
import * as _ from "lodash";

import fs = require("node:fs/promises");
import path = require("node:path");

import { stringify } from "csv-stringify/sync";

import { Table } from "./table_merger";
import {
  Appliance,
  HEAT_PUMP_DRYER_SCHEMA,
} from "../../backend/schema/appliance";
import { HEAT_PUMP_SCHEMA } from "../../backend/schema/heat_pump";
import { glob } from "glob";
import { retrieveMetadata } from "./metadata";
import { APPLIANCE_TYPES } from "../../backend/schema/metadata";
import { HEAT_PUMP_WATER_HEATER_SCHEMA } from "../../backend/schema/heat_pump_water_heater";

const SPECS_FILE_BASE = "../data/";
const INPUT_SUBDIR = "corrected/";
const OUTPUT_SUBDIR = "validated/";
const RUNS = "runs/";

program.requiredOption(
  "-f, --folders <folders...>",
  "Name of folder(s) under incentives_data/ where llm data is located."
);

program.parse();

async function initializeValidators() {
  const validators: { [index: string]: ValidateFunction<Appliance> } = {};
  const ajv = new Ajv({ allErrors: true, coerceTypes: true });

  validators[APPLIANCE_TYPES.heat_pump] = ajv.compile(HEAT_PUMP_SCHEMA);
  validators[APPLIANCE_TYPES.heat_pump_water_heater] = ajv.compile(
    HEAT_PUMP_WATER_HEATER_SCHEMA
  );
  validators[APPLIANCE_TYPES.heat_pump_dryer] = ajv.compile(
    HEAT_PUMP_DRYER_SCHEMA
  );

  return validators;
}

function findMatchingInput(
  modelNumber: string,
  inputs: Table[]
): Table | undefined {
  if (modelNumber === undefined) return undefined;
  for (const input of inputs) {
    if ("modelNumber" in input && input["modelNumber"] === modelNumber) {
      return input;
    }
  }
  return undefined;
}

function getColumns(records: Table[], schema: SomeJSONSchema): string[] {
  // Preseed with properties from schema
  let headers = Object.keys(schema.properties);
  headers = ["valid"].concat(headers);
  for (const record of records) {
    for (const key in record) {
      if (!headers.includes(key)) {
        headers.push(key);
      }
    }
  }
  return headers;
}

async function main() {
  const opts = program.opts();
  const validators = await initializeValidators();

  const allRecords: Table[] = [];
  for (const topFolder of opts.folders) {
    const folders = await glob(
      path.join(SPECS_FILE_BASE, topFolder, "**", INPUT_SUBDIR),
      { ignore: path.join(SPECS_FILE_BASE, RUNS) }
    );
    for (const inputFolder of folders) {
      const applianceFolder = path.dirname(inputFolder);
      const valid: Appliance[] = [];
      const invalid: Table[] = [];
      for (const file of await fs.readdir(inputFolder)) {
        const filteredPath = path.join(inputFolder, file);
        if (!(file === "records.json")) continue;
        const filtered = JSON.parse(
          await fs.readFile(filteredPath, {
            encoding: "utf8",
          })
        );

        if (filtered.length == 0) {
          console.log(`Skipping ${filteredPath} because it is empty`);
          continue;
        }

        if (!("data" in filtered)) {
          console.log(
            `Skipping ${filteredPath} because it didn't contain a 'data' key`
          );
        }

        const metadata = await retrieveMetadata(applianceFolder);
        const columnsToCopy = ["brandName", "sourceUrl"];
        const metadataToCopy = _.pick(metadata, columnsToCopy);

        const specs = Array.isArray(filtered["data"])
          ? filtered["data"]
          : [filtered["data"]];
        for (const spec of specs) {
          const augmentedSpec = { ...spec, ...metadataToCopy };
          const validate = validators[metadata.applianceType!];
          if (!validate)
            throw new Error(
              `No validator function found for ${metadata.applianceType}`
            );
          if (validate(augmentedSpec)) {
            valid.push(augmentedSpec);
          } else {
            if (validate.errors !== undefined && validate.errors !== null) {
              augmentedSpec.errors = validate.errors;
            }
            invalid.push(augmentedSpec);
          }
          let spreadsheetRecord = {
            valid: validate(augmentedSpec) ? "true" : "false",
            applianceType: metadata.applianceType,
            ...augmentedSpec,
          };
          const matchingRecord = findMatchingInput(
            augmentedSpec.modelNumber,
            filtered["input"]
          );
          if (matchingRecord) {
            spreadsheetRecord = {
              ...spreadsheetRecord,
              ...matchingRecord,
            };
          }
          allRecords.push(spreadsheetRecord);
        }
        const outputFolder = path.join(applianceFolder, OUTPUT_SUBDIR);
        await fs.mkdir(outputFolder, { recursive: true });
        await fs.writeFile(
          path.join(outputFolder, "valid.json"),
          JSON.stringify(valid, null, 2) + "\n",
          "utf-8"
        );
        await fs.writeFile(
          path.join(outputFolder, "invalid.json"),
          JSON.stringify(invalid, null, 2) + "\n",
          "utf-8"
        );
      }
    }
  }
  const ts = Date.now();
  await fs.mkdir(path.join(SPECS_FILE_BASE, RUNS, ts.toString()));
  await fs.writeFile(
    path.join(SPECS_FILE_BASE, RUNS, ts.toString(), "all_records.csv"),
    stringify(allRecords, {
      header: true,
      columns: getColumns(allRecords, HEAT_PUMP_SCHEMA),
    }),
    "utf-8"
  );
}

main();
