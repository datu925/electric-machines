import * as dt from "../schema/appliance";
import { HeatPumpWaterHeaterQuery, HeatPumpDryerQuery, HeatPumpHvacQuery} from "./model/appliance_query"
import { convertUnit } from "./units";

import fs = require("fs");
import path from "path";

interface IndexedArray<VALUE> {
    [key: string]: VALUE;
 }
 
const DbDefaultUnits: IndexedArray<string> = {
    'weight': 'kg',
    'dimension': 'cm',
};

const RAW_WATER_HEATERS = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/water-heaters.json"), "utf-8"));
const RAW_DRYERS = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/dryers.json"), "utf-8"));
const RAW_HEATPUMPS = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/hvac.json"), "utf-8"));
const RAW_STOVE = JSON.parse(fs.readFileSync(path.join(__dirname, "../data/stove.json"), "utf-8"));

const PROCEED_WATER_HEATERS = RAW_WATER_HEATERS.map(d => toQueryable(d)) as dt.HeatPumpWaterHeater[];
const PROCEED_DRYERS = RAW_DRYERS.map(d => toQueryable(d)) as dt.HeatPumpDryer[];
const PROCEED_HEATPUMPS = RAW_HEATPUMPS.map(d => toQueryable(d)) as dt.HeatPump[];
const PROCEED_STOVE = RAW_STOVE.map(d => toQueryable(d)) as dt.Stove[];

function toQueryable<Type extends dt.Appliance>(data: Type): Type {
    data.weight.value = convertUnit(data.weight.value, data.weight.unit, DbDefaultUnits['weight']);
    data.weight.unit = DbDefaultUnits['weight'];
    return data;
}

function toViewUnits<Type extends dt.Appliance>(d: Type, dimensionUnit: string, weightUnit: string): Type {
    d.dimensions.length = convertUnit(d.dimensions.length, d.dimensions.unit, dimensionUnit)
    d.dimensions.width = convertUnit(d.dimensions.width, d.dimensions.unit , dimensionUnit)
    d.dimensions.height = convertUnit(d.dimensions.height, d.dimensions.unit, dimensionUnit)
    d.dimensions.unit = dimensionUnit;

    d.weight.value = convertUnit(d.weight.value, d.weight.unit, weightUnit);
    d.weight.unit = weightUnit;
    return d;
}

export function queryWaterHeater(q: HeatPumpWaterHeaterQuery) {
    return PROCEED_WATER_HEATERS
            .filter((heater) =>
                        heater.weight.value <= q.weight &&
                        heater.electricBreakerSize <= q.electricBreakerSize &&
                        heater.voltage <= q.voltage &&
                        heater.tankCapacityGallons >= q.tankCapacityMin &&
                        heater.tankCapacityGallons <= q.tankCapacityMax &&
                        heater.uniformEnergyFactor >= q.uniformEnergyFactor &&
                        heater.firstHourRating >= q.firstHourRating)
            .map((data) => toViewUnits(data, q.dimensionUnit, q.weightUnit));
}

export function queryDryer(q: HeatPumpDryerQuery) {
    return PROCEED_DRYERS
            .filter((dryer) =>
                dryer.weight.value <= q.weight &&
                dryer.electricBreakerSize <= q.electricBreakerSize &&
                dryer.voltage <= q.voltage &&
                dryer.capacity >= q.capacityMin &&
                dryer.capacity <= q.capacityMax &&
                dryer.combinedEnergyFactor >= q.combinedEnergyFactor &&
                dryer.soundLevelMax <= q.soundLevel)
            .map((data) => toViewUnits(data, q.dimensionUnit, q.weightUnit));
}

export function queryHvac(q: HeatPumpHvacQuery) {
    return PROCEED_HEATPUMPS
            .filter((hp) =>
                hp.weight.value <= q.weight &&
                hp.electricBreakerSize <= q.electricBreakerSize &&
                hp.voltage <= q.voltage &&
                hp.tonnage >= q.tonnageMin &&
                hp.tonnage <= q.tonnageMax)
            .map((data) => toViewUnits(data, q.dimensionUnit, q.weightUnit));
}

export function allAppliances() {
    return { waterHeater: RAW_WATER_HEATERS, dryer: RAW_DRYERS, hvac: RAW_HEATPUMPS, stove: RAW_STOVE };
}
