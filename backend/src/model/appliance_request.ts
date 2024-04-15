import { convertUnit } from "../units";
import { HeatPumpWaterHeaterQuery, HeatPumpDryerQuery, HeatPumpHvacQuery, ApplianceQuery } from "./appliance_query"
import { RouteGenericInterface } from "fastify";

const defaultWeightUnit: string = 'lb';
const defaultDimensionUnit: string = 'in';

export interface HeatPumpWaterHeaterRequest extends HeatPumpWaterHeaterQuery, RouteGenericInterface {};
export interface HeatPumpDryerRequest extends HeatPumpDryerQuery, RouteGenericInterface {};
export interface HeatPumpHvacRequest extends HeatPumpHvacQuery, RouteGenericInterface {};

export type ApplianceRequest = 
    HeatPumpWaterHeaterRequest | 
    HeatPumpDryerRequest | 
    HeatPumpHvacRequest; 

function toApplianceQuery(r: ApplianceRequest): ApplianceQuery {
    let w = r.weight ?? Number.MAX_VALUE;
    let wu = r.weightUnit ?? defaultWeightUnit;
    let du = r.dimensionUnit ?? defaultDimensionUnit;

    return <ApplianceQuery> {
        applianceType: r.applianceType,
        weight: convertUnit(w, wu, 'kg'),
        weightUnit: wu,
        dimensionUnit: du,
        electricBreakerSize: r.electricBreakerSize ?? Number.MAX_VALUE,
        voltage: r.voltage ?? Number.MAX_VALUE,
    };
}

export function toWaterHeaterQuery(r: HeatPumpWaterHeaterRequest) : HeatPumpWaterHeaterQuery {
    let q = toApplianceQuery(r) as HeatPumpWaterHeaterQuery
    q.tankCapacityMin = r.tankCapacityMin ?? 0;
    q.tankCapacityMax = r.tankCapacityMax ?? Number.MAX_VALUE;
    q.firstHourRating = r.firstHourRating ?? 0;
    q.uniformEnergyFactor = r.uniformEnergyFactor ?? 0;
    return q;
}

export function toDryerQuery(r: HeatPumpDryerRequest) : HeatPumpDryerQuery {
    let q = toApplianceQuery(r) as HeatPumpDryerQuery
    q.capacityMin = r.capacityMin ?? 0;
    q.capacityMax = r.capacityMax ?? Number.MAX_VALUE;
    q.soundLevel = r.soundLevel ?? Number.MAX_VALUE;
    q.combinedEnergyFactor = r.combinedEnergyFactor ?? 0;
    return q;
}

export function toHvacQuery(r: HeatPumpHvacRequest): HeatPumpHvacQuery {
    let q = toApplianceQuery(r) as HeatPumpHvacQuery
    q.tonnageMin = r.tonnageMin ?? 0
    q.tonnageMax = r.tonnageMax ?? Number.MAX_VALUE;
    return q;
}
