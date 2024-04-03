import { program } from "commander";

import fs = require("fs");
import path = require("node:path");
import { parse } from "csv-parse/sync";
import { Readable } from "stream";
import { ReadableStream } from "stream/web";
import { finished } from "stream/promises";

program.requiredOption(
  "-i, --input_file <file>",
  "Path to input file with appliance metadata."
);

program.parse();

// Column names
const APPLIANCE_TYPE = "Appliance Type";
const COMPANY = "Company";
const BRAND = "Brand";
const URL = "URL";
const MODEL_NUMBERS = "Comma-separated model numbers";
const TAGS = "tags";

const FILE_BASE = "../data/";

async function main() {
  const opts = program.opts();

  const metadata = fs.readFileSync(opts.input_file, { encoding: "utf8" });
  const records = parse(metadata, {
    columns: true,
    delimiter: ",",
  });
  for (const record of records) {
    if (TAGS in record && record[TAGS].includes("index")) {
      continue;
    }
    if (
      !(
        APPLIANCE_TYPE in record &&
        COMPANY in record &&
        BRAND in record &&
        URL in record &&
        MODEL_NUMBERS in record
      )
    ) {
      throw Error(`Input file missing required columns`);
    }
    if (record[URL] === "") {
      continue;
    }

    const applianceType = record[APPLIANCE_TYPE].trim();
    if (!fs.existsSync(path.join(FILE_BASE, applianceType))) {
      throw new Error(`No appliance type directory found for ${applianceType}`);
    }
    // Note: we actually call Company "brand" in later parts of the process,
    // and Brand is closer to model name. Resolve this discrepancy later.
    const company = record[COMPANY].trim();
    if (!fs.existsSync(path.join(FILE_BASE, applianceType, company))) {
      throw new Error(
        `No company directory found for ${company} under ${applianceType}`
      );
    }
    const brand = record[BRAND].trim();
    const directory = path.join(FILE_BASE, applianceType, company, brand);
    if (fs.existsSync(directory)) {
      console.warn(`Existing directory for ${directory}`);
    } else {
      fs.mkdirSync(directory);
    }

    const resp = await fetch(record[URL]);
    if (resp.status !== 200) {
      console.error(`Non-200 status for ${record[URL]}`);
    } else if (resp.body === null) {
      console.error(`Null body for ${record[URL]}`);
    } else {
      const pdfPath = path.join(directory, "raw.pdf");
      const fileStream = fs.createWriteStream(pdfPath);
      await finished(
        Readable.fromWeb(resp.body as ReadableStream<any>).pipe(fileStream)
      );
    }

    // Split apart comma-delimited fields.
    if (TAGS in record) {
      record[TAGS] = record[TAGS].split(",").map((tag: string) => tag.trim());
    }
    if (MODEL_NUMBERS in record) {
      record[MODEL_NUMBERS] = record[MODEL_NUMBERS].split(",").map(
        (tag: string) => tag.trim()
      );
    }
    // Rename things.
    record["applianceType"] = applianceType;
    delete record[APPLIANCE_TYPE];
    record["brandName"] = company;
    delete record[COMPANY];
    record["sourceUrl"] = record[URL];
    delete record[URL];
    record["expectedModelNumbers"] = record[MODEL_NUMBERS];
    delete record[MODEL_NUMBERS];

    const metadataFilename = path.join(directory, "metadata.json");
    fs.writeFileSync(metadataFilename, JSON.stringify(record, null, 2), {
      encoding: "utf-8",
      flag: "w",
    });
  }
}

main();
