import { HeatPumpWaterHeaterQuery, HeatPumpDryerQuery, HeatPumpHvacQuery} from "./appliance_query"
import { RouteGenericInterface } from "fastify";

export interface HeatPumpWaterHeaterRequest extends HeatPumpWaterHeaterQuery, RouteGenericInterface {}
export interface HeatPumpDryerRequest extends HeatPumpDryerQuery, RouteGenericInterface {}
export interface HeatPumpHvacRequest extends HeatPumpHvacQuery, RouteGenericInterface {}

export type ApplianceRequest = 
    HeatPumpWaterHeaterRequest | 
    HeatPumpDryerRequest | 
    HeatPumpHvacRequest; 


function setOptionalsForAppliance(r: ApplianceRequest) {
    return r
}

export function setOptionalsForWaterHeater(r: HeatPumpWaterHeaterRequest) {
    let r1 = setOptionalsForAppliance(r) as HeatPumpWaterHeaterQuery
    r1.tankCapacityMin = r1.tankCapacityMin ?? 0;
    r1.tankCapacityMax = r1.tankCapacityMax ?? Number.MAX_VALUE;
    r1.firstHourRating = r1.firstHourRating ?? 0;
    r1.uniformEnergyFactor = r1.uniformEnergyFactor ?? 0;
    return r1
}

export function setOptionalsForDryer(r: HeatPumpDryerRequest) {
    let r1 = setOptionalsForAppliance(r) as HeatPumpDryerQuery
    r1.capacityMin = r1.capacityMin ?? 0;
    r1.capacityMax = r1.capacityMax ?? Number.MAX_VALUE;
    r1.soundLevel = r1.soundLevel ?? Number.MAX_VALUE;
    r1.combinedEnergyFactor = r1.combinedEnergyFactor ?? 0;
    return r1
}

export function setOptionalsForHvac(r: HeatPumpHvacRequest) {
    let r1 = setOptionalsForAppliance(r)as HeatPumpHvacQuery
    r1.tonnageMin = r1.tonnageMin ?? 0;
    r1.tonnageMax = r1.tonnageMax ?? Number.MAX_VALUE;
    return r1
}