import { FromSchema } from "json-schema-to-ts";
import { metadataProperties, requiredMetadata } from "./metadata";
import { coreProperties, requiredCore } from "./core";

export const heatPumpDryerProperties = {
  capacity: {
    type: "number",
  },
  combinedEnergyFactor: {
    type: "number",
  },
} as const;
export const requiredHeatPumpDryer = [
  "capacity",
  "combinedEnergyFactor",
] as const;

export const HEAT_PUMP_DRYER_SCHEMA = {
  title: "Heat Pump Dryer",
  type: "object",
  properties: {
    ...metadataProperties,
    ...coreProperties,
    ...heatPumpDryerProperties,
  },
  required: [...requiredMetadata, ...requiredCore, ...requiredHeatPumpDryer],
  additionalProperties: false,
} as const;

export type HeatPumpDryer = FromSchema<typeof HEAT_PUMP_DRYER_SCHEMA>;
export type HeatPumpDryerModelGenerated = Omit<HeatPumpDryer, "brandName">;
