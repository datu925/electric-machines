import { Specs, IdentifierToSpecs, DATA_FIELDS } from "./schemas";
import * as _ from "lodash";

export function mergeTablesByModelNumber(tables: Specs[]): Specs[] {
  const output: IdentifierToSpecs = {};
  for (const table of tables) {
    if (table.model_number !== undefined) {
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
export function filterTables(tables: Specs[]): Specs[] {
  return tables.filter((table) => {
    const targetFields = _.pick(table, DATA_FIELDS);
    const nonNull = Object.fromEntries(
      Object.entries(targetFields).filter(([_, v]) => v != null)
    );

    return Object.keys(nonNull).length > 0;
  });
}
