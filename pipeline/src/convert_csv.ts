import { program } from "commander";
import util from "util";

import FS from 'node:fs';
import assert from 'node:assert';
import {parse} from 'csv-parse/sync';

import fs = require("node:fs/promises");
import path = require("node:path");

import { Table, filterTables, mergeTablesByModelNumber } from "./table_merger";
import { APPLIANCE_TYPES } from "../../backend/schema/metadata";
import { glob } from "glob";
import { retrieveMetadata } from "./metadata";

const SPECS_FILE_BASE = "../data/";
const INPUT_SUBDIR = "reformatted/";
const OUTPUT_SUBDIR = "";
const RUNS = "runs/";

program.parse();

async function main() {
// loop through the sub folders in the run folder
const rfolder = path.join(SPECS_FILE_BASE, RUNS).replace(/\\/g, '/');
FS.readdir(rfolder, async (err, topFolders) => {
    if (err || !topFolders.length){
        console.log(`No runs detected`);
    }
    else{
        for (const file of topFolders){
            // Try to open the "all_records.csv" file
            const runFile = path.join(rfolder, file, "all_records.csv");
            console.log(`Trying ${runFile}`);
            FS.readFile(runFile, function (err, content) {
                // Skip the folder if there is no file
                if(err){
                    console.log(`Skipping ${file} because it is empty`);
                }
                else{
                    //Parse content and convert to JSON
                    console.log(`Parsing file found in ${runFile}`);
                    const records = parse(content, {
                        skip_empty_lines: true,
                        columns: true
                    });
                    // Create raw data file
                    const rawFileName = path.join(rfolder, file, "all_records.JSON").replace(/\\/g, '/');
                    const recordVals = Object.values(records);
                    const jsonFormatRecords = JSON.stringify(recordVals);

                    fs.writeFile(rawFileName, jsonFormatRecords, "utf-8");

                    // Create file for each type of appliance JSON key: "applianceType"
                    // "applianceType"s key values pulled from the metadata file
                    for (const appliance of Object.values(APPLIANCE_TYPES)){
                        // Iterate through JSON data keeping only entries with the matching key
                        let subSet = [];
                        for (const entry of records){
                            if (entry["applianceType"] == appliance){
                                subSet.push(entry);
                            }
                        }
                        // Save the JSON data for the single appliance type
                        let fileName = appliance.concat(".JSON");
                        let subSetFilePath = path.join(rfolder, file, fileName).replace(/\\/g, '/');
                        let jsonSubSet = JSON.stringify(subSet);
                        fs.writeFile(subSetFilePath, jsonSubSet, "utf-8");
                    }
                }
            });
        }
    }
});
}

main();
