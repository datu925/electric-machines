import { HeatPump, HeatPumpModelGenerated } from "./heat_pump";
import {
  HeatPumpWaterHeater,
  HeatPumpWaterHeaterModelGenerated,
} from "./heat_pump_water_heater";

export type Appliance = HeatPump | HeatPumpWaterHeater;
export type ModelGeneratedAppliance =
  | HeatPumpModelGenerated
  | HeatPumpWaterHeaterModelGenerated;
