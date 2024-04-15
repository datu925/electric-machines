export const coreProperties = {
  weight: {
    type: "object",
    properties: {
      value: { type: "number" },
      unit: { type: "string" },
    },
    required: ["value", "unit"],
  },
  dimensions: {
    type: "object",
    properties: {
      length: { type: "number" },
      width: { type: "number" },
      height: { type: "number" },
      unit: { type: "string" },
    },
    required: ["length", "width", "height", "unit"],
  },
  electricBreakerSize: {
    type: "number",
  },
  voltage: {
    type: "number",
  },
  soundLevelMin: {
    type: "number",
  },
  soundLevelMax: {
    type: "number",
  },
} as const;

export const requiredCore = [
  "weight",
  "dimensions",
  "electricBreakerSize",
  "voltage",
] as const;
