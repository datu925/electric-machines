import { AsyncParser } from "@json2csv/node";
import fs = require("node:fs/promises");

import {
  SYSTEM,
  EXAMPLE_1_USER,
  EXAMPLE_1_RESPONSE,
} from "./prompts/prompt_evals";
import { Appliance } from "../../backend/schema/appliance";
// Not sure why tsc won't allow an import as above, but it doesn't.
const Fuse = require("fuse.js");

// 0 is an exact match; 1 is a terrible match.
const FUZZY_MATCH_THRESHOLD = 0.5;
const KEY_NAME = "Column";
const ROW_TOTAL = "Row Total";

enum Grade {
  Unspecified = "Unspecified",

  MissingBoth = "MissingBoth",
  MissingPipeline = "MissingPipeline",
  MissingGolden = "MissingGolden",
  CaseInsensitiveMatch = "CaseInsensitiveMatch",

  FuzzyMatch = "FuzzyMatch",
  FuzzyNoMatch = "FuzzyNoMatch",

  ModelGradedMatch = "ModelGradedMatch",
  ModelGradedAlmostMatch = "ModelGradedAlmostMatch",
  ModelGradedWeakMatch = "ModelGradedWeakMatch",
  ModelGradedNoMatch = "ModelGradedNoMatch",
}

// To reduce output constraints on the model, we ask the LLM grader to simply
// give back a letter rather than a more complicated enum. Then we use this
// to translate.
const MODEL_GRADES = new Map<string, Grade>([
  ["A", Grade.ModelGradedMatch],
  ["B", Grade.ModelGradedAlmostMatch],
  ["C", Grade.ModelGradedWeakMatch],
  ["D", Grade.ModelGradedNoMatch],
]);

// These fields will be compared by a fuzzy match algorithm to basically test
// that we got that answer or extremely close.
const FUZZY_MATCH_FIELDS: (keyof Appliance)[] = [
  "weight",
  "dimensions",
  "electricBreakerSize",
  "modelVariant",
  "soundLevelMax",
  "soundLevelMin",
  "voltage",
];

// I'm not sure we'll need this, but since the code was written anyway,
// I'm inclined to keep it until we're sure we don't want more sophisticated
// grading.
const MODEL_GRADED_FIELDS: (keyof Appliance)[] = [];

export interface Diff {
  diffs: Record<string, DiffVal>;
  extra_keys?: string;
  filename?: string;
  modelNumber?: string;
}

interface DiffVal {
  grade?: string;
  golden: string;
  pipeline: string;
  explanation?: string;
}

export type Report = Array<Record<string, unknown>>;

type ModelQueryFunction = (
  input_text: string,
  system: string,
  examples: Array<[string, string]>
) => Promise<string>;

export class Differ {
  modelQueryFunction: ModelQueryFunction;

  constructor(modelQueryFunction: ModelQueryFunction) {
    this.modelQueryFunction = modelQueryFunction;
  }

  async modelGradeFields(
    golden: Partial<Appliance>,
    pipeline: Partial<Appliance>
  ): Promise<Diff> {
    const lastMessage: string = `Expert:
    ${JSON.stringify(golden)}
    
    Student:
    ${JSON.stringify(pipeline)}`;

    const resp = await this.modelQueryFunction(lastMessage, SYSTEM, [
      [EXAMPLE_1_USER, EXAMPLE_1_RESPONSE],
    ]);
    const diff: Diff = { diffs: {} };
    try {
      const parsed = JSON.parse(resp);
      for (const key in parsed) {
        diff.diffs[key] = {
          golden: String(golden[key as keyof Appliance]),
          pipeline: String(pipeline[key as keyof Appliance]),
          grade:
            MODEL_GRADES.get(parsed[key].grade.toUpperCase()) ??
            Grade.Unspecified,
          explanation: parsed[key].explanation,
        };
      }
    } catch (err) {
      console.log(`Error while parsing ${resp}: ${err}`);
    }
    return diff;
  }

  getFuzzyMatchData(
    golden: string,
    pipeline: string
  ): { grade?: string; explanation?: string } {
    const fuse = new Fuse([golden], { includeScore: true });
    const res = fuse.search(pipeline, { limit: 1 });
    const result: { grade?: string; explanation?: string } = {};
    if (
      res.length > 0 &&
      Object.hasOwn(res[0], "score") &&
      res[0].score! < FUZZY_MATCH_THRESHOLD
    ) {
      result.grade = Grade[Grade.FuzzyMatch];
      result.explanation = `Fuzzy Match score of ${res[0].score} (threshold is ${FUZZY_MATCH_THRESHOLD})`;
    } else {
      result.grade = Grade[Grade.FuzzyNoMatch];
    }
    return result;
  }

  getStringRep(value: any): string {
    if (value === undefined || value === null) {
      return "Not provided";
    }
    if (typeof value === "object") {
      // Sort object keys ensures consistent representation.
      return JSON.stringify(value, Object.keys(value).sort());
    }
    return JSON.stringify(value);
  }

  async compareAppliances(
    golden: Appliance,
    pipeline: Appliance
  ): Promise<Diff> {
    const modelGolden: Record<string, string> = {};
    const modelPipeline: Record<string, string> = {};

    const diff: Diff = { diffs: {} };
    for (const k of FUZZY_MATCH_FIELDS.concat(MODEL_GRADED_FIELDS)) {
      let base: DiffVal = {
        golden: this.getStringRep(golden[k]),
        pipeline: this.getStringRep(pipeline[k]),
      };
      // We should handle nulls elsewhere in the pipeline, but for now
      // pretend treat them as undefined.
      if (Object.hasOwn(pipeline, k) && pipeline[k] === null) {
        delete pipeline[k];
      }
      if (!(Object.hasOwn(golden, k) || Object.hasOwn(pipeline, k))) {
        base.grade = Grade.MissingBoth;
      } else if (Object.hasOwn(golden, k) && !Object.hasOwn(pipeline, k)) {
        base.grade = Grade.MissingPipeline;
      } else if (Object.hasOwn(pipeline, k) && !Object.hasOwn(golden, k)) {
        base.grade = Grade.MissingGolden;
      } else if (
        String(golden[k]).toLowerCase() == String(pipeline[k]).toLowerCase()
      ) {
        base.grade = Grade.CaseInsensitiveMatch;
      } else {
        if (FUZZY_MATCH_FIELDS.includes(k)) {
          base = {
            ...base,
            ...this.getFuzzyMatchData(String(golden[k]), String(pipeline[k])),
          };
        } else {
          modelGolden[k] = String(golden[k]);
          modelPipeline[k] = String(pipeline[k]);
        }
      }
      diff.diffs[k] = base;
    }

    if (Object.keys(modelGolden).length > 0) {
      const modelGraded = await this.modelGradeFields(
        modelGolden,
        modelPipeline
      );
      for (const key in modelGraded.diffs) {
        if (!(key in diff.diffs)) {
          console.log(`Model returned unknown key: ${key}`);
        } else {
          diff.diffs[key] = modelGraded.diffs[key];
        }
      }
    }

    return diff;
  }

  sortByModelNumber(appliances: Appliance[]): Appliance[] {
    return appliances.sort((a, b) => {
      if (a.modelNumber < b.modelNumber) {
        return -1;
      } else if (a.modelNumber === b.modelNumber) {
        return 0;
      } else {
        return 1;
      }
    });
  }

  getComparableAppliances(
    golden: Appliance[],
    pipeline: Appliance[]
  ): [Appliance[], Appliance[]] {
    if (golden.length !== pipeline.length) {
      throw new Error(
        `Different numbers of incentives: golden ${golden.length}, pipeline ${pipeline.length}`
      );
    }
    const sortedGolden = this.sortByModelNumber(golden);
    const sortedPipeline = this.sortByModelNumber(pipeline);
    sortedGolden.forEach((g, i) => {
      // Also check for duplicates.
      if (i > 0 && g.modelNumber === sortedGolden[i - 1].modelNumber) {
        throw new Error(
          `Duplicate model number found in golden array: ${g.modelNumber}`
        );
      }
      if (g.modelNumber !== sortedPipeline[i].modelNumber) {
        throw new Error(
          `Golden and pipeline datasets don't contain the same model numbers: found golden ${g.modelNumber} and pipeline ${pipeline[i].modelNumber}`
        );
      }
    });
    return [golden, pipeline];
  }

  async compareData(
    key: string,
    golden_data: Appliance[],
    pipeline_data: Appliance[]
  ): Promise<Diff[]> {
    const [golden, pipeline] = this.getComparableAppliances(
      golden_data,
      pipeline_data
    );

    const diffs: Diff[] = [];
    for (let i = 0; i < golden.length; i++) {
      const diff = await this.compareAppliances(golden[i], pipeline[i]);
      diff.filename = key;
      diff.modelNumber = golden[i].modelNumber;
      diffs.push(diff);
    }
    return diffs;
  }

  createReport(diffs: Diff[]): Report {
    const keyFrequencies: Map<string, Map<string, number>> = new Map();
    for (const diff of diffs) {
      for (const key in diff.diffs) {
        if (keyFrequencies.get(key) === undefined) {
          keyFrequencies.set(key, new Map<string, number>());
        }
        const freq = keyFrequencies.get(key)!;
        const grade = diff.diffs[key].grade!;
        freq.set(grade, 1 + (freq.get(grade) ?? 0));
        freq.set(ROW_TOTAL, 1 + (freq.get(ROW_TOTAL) ?? 0));
      }
    }
    const report: Report = [];
    const totals: Map<string, number> = new Map();
    keyFrequencies.forEach((val, key) => {
      const row: Record<string, unknown> = {};
      val.forEach((count, grade) => {
        row[grade] = count;
        totals.set(grade, count + (totals.get(grade) ?? 0));
      });
      row[KEY_NAME] = key;
      report.push(row);
    });
    const row: Record<string, unknown> = {};
    row[KEY_NAME] = "Column Totals";
    totals.forEach((val, grade) => {
      row[grade] = val;
    });
    report.push(row);
    return report;
  }

  async writeReport(report: Report, filename: string) {
    const fields: string[] = [KEY_NAME];
    const keys = Object.keys(Grade) as (keyof typeof Grade)[];
    for (const key of keys) {
      fields.push(Grade[key]);
    }
    fields.push(ROW_TOTAL);
    const parser = new AsyncParser({ fields: fields });

    const csv = await parser.parse(report).promise();
    fs.writeFile(filename, csv);
  }
}
