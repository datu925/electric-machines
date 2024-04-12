import * as dt from "../schema/appliance";
import { HeatPumpWaterHeaterQuery, HeatPumpDryerQuery, HeatPumpHvacQuery} from "./model/appliance_query"

import fs = require("fs");
import path from "path";

const RAW_WATER_HEATERS: dt.HeatPumpWaterHeater[] = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/water-heaters.json"), "utf-8"));
const RAW_DRYERS: dt.HeatPumpDryer[] = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/dryers.json"), "utf-8"));
const RAW_HEATPUMPS: dt.HeatPump[] = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/hvac.json"), "utf-8"));
const RAW_STOVE: dt.Stove[] = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/stove.json"), "utf-8"));

export function queryWaterHeater(q: HeatPumpWaterHeaterQuery) {
    return RAW_WATER_HEATERS.filter((heater) =>
        heater.tankCapacityGallons >= q.tankCapacityMin &&
        heater.tankCapacityGallons <= q.tankCapacityMax &&
        heater.uniformEnergyFactor >= q.uniformEnergyFactor &&
        heater.firstHourRating >= q.firstHourRating
    );
}

export function queryDryer(q: HeatPumpDryerQuery) {
    return RAW_DRYERS.filter((dryer) =>
        dryer.capacity >= q.capacityMin &&
        dryer.capacity <= q.capacityMax &&
        dryer.combinedEnergyFactor >= q.combinedEnergyFactor &&
        dryer.soundLevelMax <= q.soundLevel
    );
}

export function queryHvac(q: HeatPumpHvacQuery) {
    return RAW_HEATPUMPS.filter((hp) =>
        hp.tonnage >= q.tonnageMin &&
        hp.tonnage <= q.tonnageMax
    );
}

export function allAppliances() {
    return { waterHeater: RAW_WATER_HEATERS, dryer: RAW_DRYERS, hvac: RAW_HEATPUMPS, stove: RAW_STOVE };
}
