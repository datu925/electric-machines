import { FromSchema } from "json-schema-to-ts";
import {
  ManuallyEntered,
  metadataProperties,
  requiredMetadata,
} from "./metadata";
import { coreProperties, requiredCore } from "./core";

const powerType = ["electric", "induction"];

export const StoveProperties = {
  numElements: {
    type: "number"
  },
  cooktopsPowerType: {
    type: "string",
    enum: powerType,
  },
  ovenCapacity: {
    type: "number"
  },
  ovenCapacityUnit: {
    type: "string"
  },
  bakeWattage: {
    type: "number"
  },
  broilerWattage: {
    type: "number"
  },
  convectionWattage: {
    type: "number"
  }
} as const;
export const requiredStove = ["numElements", "cooktopsPowerSource", "ovenCapacity", "ovenCapacityUnit"] as const;

export const STOVE_SCHEMA = {
  title: "Stove",
  type: "object",
  properties: {
    ...metadataProperties,
    ...coreProperties,
    ...StoveProperties,
  },
  additionalProperties: false,
  required: [...requiredMetadata, ...requiredCore, ...requiredStove],
} as const;

export type Stove = FromSchema<typeof STOVE_SCHEMA>;
export type StoveModelGenerated = Omit<Stove, ManuallyEntered>;
