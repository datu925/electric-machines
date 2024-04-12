export interface ApplianceQuery {
    readonly applianceType: string;
};

export interface HeatPumpWaterHeaterQuery extends ApplianceQuery {
    tankCapacityMin: number;
    tankCapacityMax: number;
    uniformEnergyFactor: number;
    firstHourRating: number;
};

export interface HeatPumpDryerQuery extends ApplianceQuery {
    capacityMin: number;
    capacityMax: number;
    soundLevel: number;
    combinedEnergyFactor: number;
};

export interface HeatPumpHvacQuery extends ApplianceQuery {
    tonnageMin: number;
    tonnageMax: number;
};
