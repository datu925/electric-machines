import Ajv, { JSONSchemaType } from "ajv";
import { program } from "commander";

import fs = require("node:fs/promises");
import path = require("node:path");

import { Table, filterTables, mergeTablesByModelNumber } from "./table_merger";
import { HeatPump } from "../../backend/src/domain/heatpump";
import { glob } from "glob";
import { retrieveMetadata } from "./metadata";

const SPECS_FILE_BASE = "../data/";
const INPUT_SUBDIR = "merged/";
const OUTPUT_SUBDIR = "validated/";
const RUNS = "runs/";

const APPLIANCE_SCHEMA = "../backend/schema/heatpump.json";

program.requiredOption(
  "-f, --folders <folders...>",
  "Name of folder(s) under incentives_data/ where llm data is located."
);

program.parse();

async function createValidator() {
  const applianceSchema: JSONSchemaType<HeatPump> = JSON.parse(
    await fs.readFile(APPLIANCE_SCHEMA, "utf8")
  );
  const ajv = new Ajv({ allErrors: true });
  const validate = ajv.compile(applianceSchema);
  return validate;
}

async function main() {
  const opts = program.opts();
  const validate = await createValidator();
  for (const topFolder of opts.folders) {
    const folders = await glob(
      path.join(SPECS_FILE_BASE, topFolder, "**", INPUT_SUBDIR),
      { ignore: path.join(SPECS_FILE_BASE, RUNS) }
    );
    for (const inputFolder of folders) {
      const applianceFolder = path.dirname(inputFolder);
      const valid: HeatPump[] = [];
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

        const specs = Array.isArray(filtered) ? filtered : [filtered];
        for (const spec of specs) {
          if (validate(spec)) {
            valid.push(spec);
          } else {
            if (validate.errors !== undefined && validate.errors !== null) {
              spec.errors = validate.errors;
            }
            invalid.push(spec);
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
