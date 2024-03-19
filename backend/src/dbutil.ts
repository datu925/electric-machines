import * as dt from "../schema/heat_pump_water_heater";

const dummyWaterHeater: dt.HeatPumpWaterHeater = {
  brandName: "Rheem",
  modelNumber: "PROPH40 T0 RH120-M",
  modelType: "701460",
  tankCapacityGallons: 40,
  weightInKg: 71.214,
  widthInCm: 50,
  heightInCm: 160.02,
  lengthInCm: 50,
  amperage: 3.67,
  voltage: 120,
};

export function findWaterHeater() {
  return [dummyWaterHeater, dummyWaterHeater];
}
