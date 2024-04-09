import { RouteGenericInterface } from "fastify";

export interface Appliance {
    readonly applianceType: string;
}
  
export interface HeatPumpWaterHeaterRequest extends RouteGenericInterface, Appliance {
    tankCapacityMin: number;
    tankCapacityMax: number;
    uniformEnergyFactor: number;
    firstHourRating: number;
};

export interface HeatPumpDryerRequest extends RouteGenericInterface, Appliance {
    capacityMin: number;
    capacityMax: number;
    soundLevel: number;
    combinedEnergyFactor: number;
}

export interface HeatPumpHvacRequest extends RouteGenericInterface, Appliance {
    tonnageMin: number;
    tonnageMax: number;
}

export type ApplianceRequest = HeatPumpWaterHeaterRequest | HeatPumpDryerRequest; 
