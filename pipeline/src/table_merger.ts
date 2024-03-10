import { METADATA } from "./schemas";
import * as _ from "lodash";

export type Table = {
  [index: string]: string | number | null;
};
export type IdentifierToTable = { [index: string]: Table };

const BRANDS = {
  rheem: "rheem",
  unknown: "unknown",
} as const;
export type Brand = keyof typeof BRANDS;

function canonicalModelNumber(modelNumber: string, brand: Brand): string {
  if (brand === "rheem" && modelNumber.endsWith("A")) {
    return modelNumber.slice(0, modelNumber.length - 1);
  }
  return modelNumber;
}

export function mergeTablesByModelNumber(
  tables: Table[],
  brand: Brand = "unknown"
): Table[] {
  const output: IdentifierToTable = {};
  for (const table of tables) {
    if (table.model_number) {
      const canonical = canonicalModelNumber(String(table.model_number), brand);
      if (output[canonical] === undefined) {
        output[canonical] = { model_number: canonical };
      }
      // TODO: add better auditing of merging behavior.
      // Current behavior is first key wins.
      output[canonical] = { ...table, ...output[canonical] };
    }
  }
  return Object.values(output);
}

function isValid(table: Table): boolean {
  // For now, our simple test is that a valid model number can't
  // have spaces. We'll evolve this over time.
  if (!table["model_number"]) return false;
  if ((table["model_number"] as String).includes(" ")) return false;

  // We expect at least the model_number; if nothing else, drop.
  return Object.keys(table).length > 1;
}

// Filter out anything that has no data from our schema at all.
export function filterTables(tables: Table[]): Table[] {
  return tables.filter((table) => isValid(table));
}
