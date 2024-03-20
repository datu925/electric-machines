import { HeatPumpModelGenerated } from "../../backend/schema/heat_pump";
import { HeatPumpWaterHeaterModelGenerated } from "../../backend/schema/heat_pump_water_heater";

export type FieldMetadata = { description: string };
export type SpecsMetadata<T> = { [K in keyof T]: FieldMetadata };

// TODO: dedupe these and tie more closely to the source schema.
export const HEAT_PUMP_METADATA: SpecsMetadata<HeatPumpModelGenerated> = {
  modelNumber: {
    description:
      "Reqired field. The appliance's model number. Will typically correspond to an entire column or row in the table.",
  },
  tonnage: {
    description: "The nominal tonnage of the appliance.",
  },
  weightInKg: {
    description: "The weight or operating weight of the appliance.",
  },
  lengthInCm: {
    description: "The operating length of the equipment in centimeters.",
  },
  widthInCm: {
    description: "The operating width of the equipment in centimeters.",
  },
  heightInCm: {
    description: "The operating height of the equipment in centimeters.",
  },
  amperage: {
    description: "The required amperage for the equipment.",
  },
  voltage: {
    description: "The required voltage for the equipment.",
  },
  soundLevelMin: {
    description: "The minimum sound level in decibels.",
  },
  soundLevelMax: {
    description: "The maximum sound level in decibels.",
  },
};

export const HEAT_PUMP_WATER_HEATER_METADATA: SpecsMetadata<HeatPumpWaterHeaterModelGenerated> =
  {
    modelNumber: {
      description:
        "Reqired field. The appliance's model number. Will typically correspond to an entire column or row in the table.",
    },
    tankCapacityGallons: {
      description: "The tank capacity in gallons.",
    },
    weightInKg: {
      description: "The weight or operating weight of the appliance.",
    },
    lengthInCm: {
      description: "The operating length of the equipment in centimeters.",
    },
    widthInCm: {
      description: "The operating width of the equipment in centimeters.",
    },
    heightInCm: {
      description: "The operating height of the equipment in centimeters.",
    },
    amperage: {
      description: "The required amperage for the equipment.",
    },
    voltage: {
      description: "The required voltage for the equipment.",
    },
    soundLevelMin: {
      description: "The minimum sound level in decibels.",
    },
    soundLevelMax: {
      description: "The maximum sound level in decibels.",
    },
  };
