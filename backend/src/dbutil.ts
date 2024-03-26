import * as dt from "../schema/appliance";

export function findWaterHeater(
  tankCapacity: number,
  uniformEnergyFactor: number,
  firstHourRating: number
) {
  return dummyWaterHeaters;
}

export function findDryer(
  soundLevel: number,
  combinedEnergyFactor: number,
  capacity: number
) {
  return dummyDryers;
}

const dummyWaterHeaters: dt.HeatPumpWaterHeater[] = [
  {
    brandName: "Rheem",
    modelNumber: "GEH50DFEJ2RA",
    modelVariant: "701460",
    tankCapacityGallons: 60,
    weightInKg: 71.214,
    widthInCm: 50,
    heightInCm: 160.02,
    lengthInCm: 50,
    amperage: 3.67,
    voltage: 120,
    uniformEnergyFactor: 2.6,
    firstHourRating: 60,
  },
  {
    brandName: "Rheem",
    modelNumber: "HP10-80H42DV",
    modelVariant: "701460",
    tankCapacityGallons: 70,
    weightInKg: 71.214,
    widthInCm: 50,
    heightInCm: 160.02,
    lengthInCm: 50,
    amperage: 3.67,
    voltage: 120,
    uniformEnergyFactor: 2.7,
    firstHourRating: 70,
  },
  {
    brandName: "Rheem",
    modelNumber: "RE2H80R10B-12CWT",
    modelVariant: "701460",
    tankCapacityGallons: 70,
    weightInKg: 71.214,
    widthInCm: 50,
    heightInCm: 160.02,
    lengthInCm: 50,
    amperage: 3.67,
    voltage: 120,
    uniformEnergyFactor: 2.8,
    firstHourRating: 50,
  },
  {
    brandName: "Rheem",
    modelNumber: "RE22SR10B-12CWT",
    modelVariant: "701460",
    tankCapacityGallons: 60,
    weightInKg: 71.214,
    widthInCm: 50,
    heightInCm: 160.02,
    lengthInCm: 50,
    amperage: 3.67,
    voltage: 120,
    uniformEnergyFactor: 2.9,
    firstHourRating: 60,
  },
];

const dummyDryers: dt.HeatPumpDryer[] = [
  {
    brandName: "Rheem",
    modelNumber: "XJ-75F",
    modelVariant: "701460",
    weightInKg: 71.214,
    widthInCm: 50,
    heightInCm: 160.02,
    lengthInCm: 50,
    amperage: 3.67,
    voltage: 120,
    soundLevelMin: 63,
    combinedEnergyFactor: 5,
    capacity: 7,
  },
  {
    brandName: "Rheem",
    modelNumber: "XJ-75F",
    modelVariant: "701460",
    weightInKg: 71.214,
    widthInCm: 50,
    heightInCm: 160.02,
    lengthInCm: 50,
    amperage: 3.67,
    voltage: 120,
    soundLevelMin: 62,
    combinedEnergyFactor: 6,
    capacity: 7.5,
  },
  {
    brandName: "Rheem",
    modelNumber: "LM-40K",
    modelVariant: "701460",
    weightInKg: 71.214,
    widthInCm: 50,
    heightInCm: 160.02,
    lengthInCm: 50,
    amperage: 3.67,
    voltage: 120,
    soundLevelMin: 65,
    combinedEnergyFactor: 6.5,
    capacity: 8,
  },
  {
    brandName: "Rheem",
    modelNumber: "AB-65R",
    modelVariant: "701460",
    weightInKg: 71.214,
    widthInCm: 50,
    heightInCm: 160.02,
    lengthInCm: 50,
    amperage: 3.67,
    voltage: 120,
    soundLevelMin: 65,
    combinedEnergyFactor: 8,
    capacity: 9,
  },
];
