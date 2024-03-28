export const coreProperties = {
  weightInKg: {
    type: "number",
  },
  lengthInCm: {
    type: "number",
  },
  widthInCm: {
    type: "number",
  },
  heightInCm: {
    type: "number",
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
  "weightInKg",
  "lengthInCm",
  "widthInCm",
  "heightInCm",
  "electricBreakerSize",
  "voltage",
] as const;
