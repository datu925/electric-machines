import { Specs, IdentifierToSpecs } from "./schemas";

export function mergeTablesByModelNumber(tables: Specs[]): Specs[] {
  const output: IdentifierToSpecs = {};
  for (const table of tables) {
    if (table.model_number !== undefined) {
      if (output[table.model_number] === undefined) {
        output[table.model_number] = {};
      }
      // TODO: add better auditing of merging behavior so we know how often
      // keys are overwritten.
      output[table.model_number] = { ...output[table.model_number], ...table };
    }
  }
  return Object.values(output);
}
