import { FromSchema } from "json-schema-to-ts";
import {
  ManuallyEntered,
  metadataProperties,
  requiredMetadata,
} from "./metadata";
import { coreProperties, requiredCore } from "./core";

export const heatPumpWaterHeaterProperties = {
  tankCapacityGallons: {
    type: "number",
  },
  uniformEnergyFactor: {
    type: "number",
  },
  firstHourRating: {
    type: "number",
  },
} as const;
export const requiredHeatPumpWaterHeater = [
  "tankCapacityGallons",
  "uniformEnergyFactor",
  "firstHourRating",
] as const;

export const HEAT_PUMP_WATER_HEATER_SCHEMA = {
  title: "Heat Pump Water Heater",
  type: "object",
  properties: {
    ...metadataProperties,
    ...coreProperties,
    ...heatPumpWaterHeaterProperties,
  },
  required: [
    ...requiredMetadata,
    ...requiredCore,
    ...requiredHeatPumpWaterHeater,
  ],
  additionalProperties: false,
} as const;

export type HeatPumpWaterHeater = FromSchema<
  typeof HEAT_PUMP_WATER_HEATER_SCHEMA
>;
export type HeatPumpWaterHeaterModelGenerated = Omit<
  HeatPumpWaterHeater,
  ManuallyEntered
>;
