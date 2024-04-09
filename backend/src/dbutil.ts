import * as dt from "../schema/appliance";
import * as req from "./model/appliance_request";

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

export function findWaterHeater(r: req.HeatPumpWaterHeaterRequest) {
  return WATER_HEATERS.filter((heater) => {
    return (
      heater.tankCapacityGallons >= r.tankCapacityMin &&
      heater.tankCapacityGallons <= r.tankCapacityMax &&
      heater.uniformEnergyFactor >= r.uniformEnergyFactor &&
      heater.firstHourRating >= r.firstHourRating
    );
  });
}

export function findDryer(r: req.HeatPumpDryerRequest) {
  return DRYERS.filter((dryer) => {
    return (
      dryer.capacity >= r.capacityMin &&
      dryer.capacity <= r.capacityMax &&
      dryer.combinedEnergyFactor >= r.combinedEnergyFactor &&
      dryer.soundLevelMax <= r.soundLevel
    );
  });
}

export function findHvac(r: req.HeatPumpHvacRequest) {
  return HEATPUMPS.filter((hp) => {
    return (
      hp.tonnage >= r.tonnageMin &&
      hp.tonnage <= r.tonnageMax
    );
  });
}

export function allAppliances() {
  return { waterHeater: WATER_HEATERS, dryer: DRYERS, hvac: HEATPUMPS, stove: STOVE };
}
