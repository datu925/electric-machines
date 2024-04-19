import { program } from "commander";
import util from "util";

import fs from 'node:fs';
import assert from 'node:assert';
import {parse} from 'csv-parse/sync';

import path = require("node:path");


import { Table, filterTables, mergeTablesByModelNumber } from "./table_merger";
import { APPLIANCE_TYPES } from "../../backend/schema/metadata";
import { glob } from "glob";
import { retrieveMetadata } from "./metadata";

const _ = require("lodash");

const SPECS_FILE_BASE = "../data/";
const INPUT_SUBDIR = "reformatted/";
const OUTPUT_SUBDIR = "";
const RUNS = "runs/";

program.requiredOption(
    "-i, --input_file <file>",
    "Path to input file with appliance metadata."
  );

program.parse();

async function main() {
    // loop through the given folder
    const rfolder = program.opts();
    //console.log(`Input File: ${rfolder.input_file}`);
    const runFile = fs.readFileSync(rfolder.input_file, {encoding: "utf-8"});
                
    //Parse content and convert to JSON
    const records = parse(runFile, {
        skip_empty_lines: true,
        columns: true
    });

    // Create raw data file
    const rawFileName = path.join(rfolder.input_file, "../" , "all_records.json").replace(/\\/g, '/');
    console.log(`Number of Records found: ${records.length}`);
    fs.writeFileSync(rawFileName, JSON.stringify(records),  {
        encoding: "utf-8",
        flag: "w",
        });

    // Create file for each type of appliance JSON key: "applianceType"
    // "applianceType"s key values pulled from the metadata file
    const appliances = Object.values(APPLIANCE_TYPES);
    for (const appliance of appliances){
        let fRecords = _.filter(records, ["applianceType", appliance]);

        // Save the JSON data for the single appliance type
        let fileName = appliance.concat(".json");
        let subSetFilePath = path.join(rfolder.input_file, "../", fileName).replace(/\\/g, '/');
        fs.writeFileSync(subSetFilePath, JSON.stringify(fRecords),  {
            encoding: "utf-8",
            flag: "w",
            });
    }
}

main();
