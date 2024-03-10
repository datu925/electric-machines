import { METADATA } from "./schemas";
import * as _ from "lodash";

export type Table = {
  [index: string]: string | number | null;
};
export type IdentifierToTable = { [index: string]: Table };

export function mergeTablesByModelNumber(tables: Table[]): Table[] {
  const output: IdentifierToTable = {};
  for (const table of tables) {
    if (table.model_number) {
      if (output[table.model_number] === undefined) {
        output[table.model_number] = { model_number: table.model_number };
      }
      // TODO: add better auditing of merging behavior so we know how often
      // keys are overwritten.
      output[table.model_number] = { ...output[table.model_number], ...table };
    }
  }
  return Object.values(output);
}

// Filter out anything that has no data from our schema at all.
export function filterTables(tables: Table[]): Table[] {
  return tables.filter((table) => {
    const targetFields = _.pick(table, Object.keys(METADATA));
    const nonNull = Object.fromEntries(
      Object.entries(targetFields).filter(([_, v]) => v != null)
    );

    // We expect at least the model_number; if nothing else, drop.
    return Object.keys(nonNull).length > 1;
  });
}
