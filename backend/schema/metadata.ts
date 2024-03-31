export const BRANDS = {
  Rheem: "Rheem",
  Unknown: "Unknown",
} as const;
export type Brand = keyof typeof BRANDS;

export const APPLIANCE_TYPES = {
  heat_pump: "heat_pump",
  heat_pump_water_heater: "heat_pump_water_heater",
  heat_pump_dryer: "heat_pump_dryer",
} as const;
export type ApplianceType = keyof typeof APPLIANCE_TYPES;

export const metadataProperties = {
  brandName: {
    type: "string",
    enum: Object.keys(BRANDS),
  },
  modelNumber: {
    type: "string",
  },
  modelVariant: {
    type: "string",
  },
  sourceUrl: {
    type: "string",
  },
} as const;

export const requiredMetadata = ["brandName", "modelNumber"] as const;
export type ManuallyEntered = "brandName" | "sourceUrl";
