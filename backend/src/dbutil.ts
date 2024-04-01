import * as dt from "../schema/appliance";
import fs = require("fs");
import path from "path";

export const WATER_HEATERS: dt.HeatPumpWaterHeater[] = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/water-heaters.json"), "utf-8")
);

export const DRYERS: dt.HeatPumpDryer[] = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/dryers.json"), "utf-8")
);

export function findWaterHeater(
  tankCapacityMin: number,
  tankCapacityMax: number,
  uniformEnergyFactor: number,
  firstHourRating: number
) {
  return WATER_HEATERS.filter((heater) => {
    return (
      heater.tankCapacityGallons >= tankCapacityMin &&
      heater.tankCapacityGallons <= tankCapacityMax &&
      heater.uniformEnergyFactor >= uniformEnergyFactor &&
      heater.firstHourRating >= firstHourRating
    );
  });
}

export function findDryer(
  capacityMin: number,
  capacityMax: number,
  soundLevel: number,
  combinedEnergyFactor: number
) {
  return DRYERS.filter((dryer) => {
    return (
      dryer.capacity >= capacityMin &&
      dryer.capacity <= capacityMax &&
      dryer.soundLevelMax <= soundLevel &&
      dryer.combinedEnergyFactor >= combinedEnergyFactor
    );
  });
}

export function allAppliances() {
  return { waterHeater: WATER_HEATERS, dryer: DRYERS };
}
