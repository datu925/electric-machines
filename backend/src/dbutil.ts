import * as dt from "../schema/appliance";
import fs = require("fs");
import path from "path";

const waterHeaters: dt.HeatPumpWaterHeater[] = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/water-heaters.json"), "utf-8")
);

const dryers: dt.HeatPumpDryer[] = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/dryers.json"), "utf-8")
);

export function findWaterHeater(
  tankCapacity: number,
  uniformEnergyFactor: number,
  firstHourRating: number
) {
  return waterHeaters.filter((heater) => {
    if (heater.tankCapacityGallons < tankCapacity) {
      return false;
    }
    if (heater.uniformEnergyFactor < uniformEnergyFactor) {
      return false;
    }
    if (heater.firstHourRating < firstHourRating) {
      return false;
    }
    return true;
  });
}

export function findDryer(
  soundLevel: number,
  combinedEnergyFactor: number,
  capacity: number
) {
  return dryers.filter((dryer) => {
    if (dryer.soundLevelMax > soundLevel) {
      return false;
    }
    if (dryer.combinedEnergyFactor < combinedEnergyFactor) {
      return false;
    }
    if (dryer.capacity < capacity) {
      return false;
    }
    return true;
  });
}
