import { FromSchema } from "json-schema-to-ts";
import { metadataProperties, requiredMetadata } from "./metadata";
import { coreProperties, requiredCore } from "./core";

const tonnage = ["1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5"];

export const heatPumpProperties = {
  tonnage: {
    type: "string",
    enum: tonnage,
  },
} as const;
export const requiredHeatPump = ["tonnage"] as const;

export const HEAT_PUMP_SCHEMA = {
  title: "Heat Pump",
  type: "object",
  properties: {
    ...metadataProperties,
    ...coreProperties,
    ...heatPumpProperties,
  },
  required: [...requiredMetadata, ...requiredCore, ...requiredHeatPump],
} as const;

export type HeatPump = FromSchema<typeof HEAT_PUMP_SCHEMA>;
export type HeatPumpModelGenerated = Omit<HeatPump, "brandName" | "modelType">;
