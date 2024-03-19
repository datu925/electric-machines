import Ajv, { ValidateFunction } from "ajv";
import { program } from "commander";
import * as _ from "lodash";

import fs = require("node:fs/promises");
import path = require("node:path");

import { Table } from "./table_merger";
import { Appliance } from "../../backend/schema/appliance";
import { HEAT_PUMP_SCHEMA } from "../../backend/schema/heat_pump";
import { glob } from "glob";
import { retrieveMetadata } from "./metadata";
import { MODEL_TYPES, requiredMetadata } from "../../backend/schema/metadata";
import { HEAT_PUMP_WATER_HEATER_SCHEMA } from "../../backend/schema/heat_pump_water_heater";

const SPECS_FILE_BASE = "../data/";
const INPUT_SUBDIR = "merged/";
const OUTPUT_SUBDIR = "validated/";
const RUNS = "runs/";

program.requiredOption(
  "-f, --folders <folders...>",
  "Name of folder(s) under incentives_data/ where llm data is located."
);

program.parse();

async function initializeValidators() {
  const validators: { [index: string]: ValidateFunction<Appliance> } = {};
  const ajv = new Ajv({ allErrors: true });

  validators[MODEL_TYPES.heat_pump] = ajv.compile(HEAT_PUMP_SCHEMA);
  validators[MODEL_TYPES.heat_pump_water_heater] = ajv.compile(
    HEAT_PUMP_WATER_HEATER_SCHEMA
  );

  return validators;
}

async function main() {
  const opts = program.opts();
  const validators = await initializeValidators();
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
        if (!(file === "filtered.json")) continue;
        const filtered = JSON.parse(
          await fs.readFile(filteredPath, {
            encoding: "utf8",
          })
        );

        if (filtered.length == 0) {
          console.log(`Skipping ${filteredPath} because it is empty`);
          continue;
        }

        const metadata = await retrieveMetadata(applianceFolder);
        const metadataToCopy = _.pick(metadata, requiredMetadata);

        const specs = Array.isArray(filtered) ? filtered : [filtered];
        for (const spec of specs) {
          const augmentedSpec = { ...spec, ...metadataToCopy };
          const validate = validators[metadataToCopy.modelType!];
          if (validate(augmentedSpec)) {
            valid.push(augmentedSpec);
          } else {
            if (validate.errors !== undefined && validate.errors !== null) {
              augmentedSpec.errors = validate.errors;
            }
            invalid.push(augmentedSpec);
          }
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
}

main();
