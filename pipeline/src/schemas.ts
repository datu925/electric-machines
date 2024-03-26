import { HeatPumpModelGenerated } from "../../backend/schema/heat_pump";
import { HeatPumpDryerModelGenerated } from "../../backend/schema/heat_pump_dryer";
import { HeatPumpWaterHeaterModelGenerated } from "../../backend/schema/heat_pump_water_heater";

export type FieldMetadata = { description: string };
export type SpecsMetadata<T> = { [K in keyof T]: FieldMetadata };

// TODO: dedupe these and tie more closely to the source schema.
export const HEAT_PUMP_METADATA: SpecsMetadata<HeatPumpModelGenerated> = {
  modelNumber: {
    description:
      "Reqired field. The appliance's model number. Will typically correspond to an entire column or row in the table.",
  },
  modelVariant: {
    description:
      "An optional, more fine-grained number similar to the model number that describes the type of appliance.",
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
    modelVariant: {
      description:
        "An optional, more fine-grained number similar to the model number that describes the type of appliance.",
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
    uniformEnergyFactor: {
      description: "The UEF or Uniform Energy Factor, an efficiency metric.",
    },
    firstHourRating: {
      description:
        "A performance metric indicating the amount of hot water a water heater can supply in an hour after being fully heated.",
    },
  };

export const HEAT_PUMP_DRYER_METADATA: SpecsMetadata<HeatPumpDryerModelGenerated> =
  {
    modelNumber: {
      description:
        "Reqired field. The appliance's model number. Will typically correspond to an entire column or row in the table.",
    },
    modelVariant: {
      description:
        "An optional, more fine-grained number similar to the model number that describes the type of appliance.",
    },
    capacity: {
      description: "The capacity of the dryer in cubic feet.",
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
    combinedEnergyFactor: {
      description:
        "The Combined Energy Factor, an efficiency metric for dryers.",
    },
  };
