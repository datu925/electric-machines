import * as dt from "./domain/heatpump";

const dummyWaterHeater : dt.HeatPump = {
    brandName: "Rheem",
    modelNumber: "PROPH40 T0 RH120-M",
    modelType: "701460",
    weightInKg: 71.214,
    widthInCm: 50,
    heighInCm: 160.02,
    DepthInCm: 50,
    TankCapacity: 40, // in gallons for now?
    indoorOutDoor: "outdoor",
    amperage: 3.67,
    voltage: 120,
    powerConsumption: 440,
    electricalPhase: 1,
    circuitRequired: false,
    circuitCapacity: 3500,
    performanceRating: "LEED Points 3",
    taxRebate: false,
};

export function findWaterHeater() {
    return [dummyWaterHeater, dummyWaterHeater];
}
