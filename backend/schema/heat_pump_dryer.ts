import { FromSchema } from "json-schema-to-ts";
import { metadataProperties, requiredMetadata } from "./metadata";
import { coreProperties, requiredCore } from "./core";

const noise = ["Low", "Medium", "High"];

export const heatPumpDryerProperties = {
  capacity: {
    type: "number",
  },
  noise: {
    type: "string",
    enum: noise,
  },
  cef: {
    type: "number",
  },
} as const;
export const requiredHeatPumpDryer = ["capacity", "noise", "cef"] as const;

export const HEAT_PUMP_Dryer_SCHEMA = {
  title: "Heat Pump Dryer",
  type: "object",
  properties: {
    ...metadataProperties,
    ...coreProperties,
    ...heatPumpDryerProperties,
  },
  required: [
    ...requiredMetadata,
    ...requiredCore,
    ...requiredHeatPumpDryer,
  ],
  additionalProperties: false,
} as const;

export type HeatPumpDryer = FromSchema<
  typeof HEAT_PUMP_Dryer_SCHEMA
>;
export type HeatPumpDryerModelGenerated = Omit<
  HeatPumpDryer,
  "brandName" | "modelType"
>;
