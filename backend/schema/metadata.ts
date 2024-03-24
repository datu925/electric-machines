// TODO: why is brand an enum instead of a string?
export const BRANDS = {
  rheem: "rheem",
  unknown: "unknown",
} as const;
export type Brand = keyof typeof BRANDS;

export const MODEL_TYPES = {
  heat_pump: "heat_pump",
  heat_pump_water_heater: "heat_pump_water_heater",
  heat_pump_dryer: "heat_pump_dryer",
} as const;
export type ModelType = keyof typeof MODEL_TYPES;

export const metadataProperties = {
  brandName: {
    type: "string",
    enum: Object.keys(BRANDS),
  },
  modelNumber: {
    type: "string",
  },
  modelType: {
    type: "string",
    enum: Object.keys(MODEL_TYPES),
  },
} as const;

export const requiredMetadata = [
  "brandName",
  "modelNumber",
  "modelType",
] as const;
