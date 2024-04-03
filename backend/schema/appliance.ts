export * from "./heat_pump";
export * from "./heat_pump_dryer";
export * from "./heat_pump_water_heater";
export * from "./stove";

import { HeatPump, HeatPumpModelGenerated } from "./heat_pump";
import { HeatPumpDryer, HeatPumpDryerModelGenerated } from "./heat_pump_dryer";
import { HeatPumpWaterHeater, HeatPumpWaterHeaterModelGenerated} from "./heat_pump_water_heater";
import { Stove, StoveModelGenerated} from "./stove";

export type Appliance = HeatPump | HeatPumpWaterHeater | HeatPumpDryer | Stove;
export type ModelGeneratedAppliance =
  | HeatPumpModelGenerated
  | HeatPumpWaterHeaterModelGenerated
  | HeatPumpDryerModelGenerated
  | StoveModelGenerated;
