import * as dt from "../schema/appliance";
import fs = require("fs");
import path from "path";

export const WATER_HEATERS: dt.HeatPumpWaterHeater[] = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/water-heaters.json"), "utf-8")
);

export const DRYERS: dt.HeatPumpDryer[] = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/dryers.json"), "utf-8")
);

export const HEATPUMPS: dt.HeatPump[] = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/hvac.json"), "utf-8")
);

export const STOVE: dt.Stove[] = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../data/stove.json"), "utf-8")
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
  combinedEnergyFactor: number,
  soundLevel: number
) {
  return DRYERS.filter((dryer) => {
    return (
      dryer.capacity >= capacityMin &&
      dryer.capacity <= capacityMax &&
      dryer.combinedEnergyFactor >= combinedEnergyFactor &&
      dryer.soundLevelMax <= soundLevel
    );
  });
}

export function findHvac(
  tonnageMin: number,
  tonnageMax: number,
) {
  return HEATPUMPS.filter((hp) => {
    return (
      hp.tonnage >= tonnageMin &&
      hp.tonnage <= tonnageMax
    );
  });
}

export function allAppliances() {
  return { waterHeater: WATER_HEATERS, dryer: DRYERS, hvac: HEATPUMPS, stove: STOVE };
}
