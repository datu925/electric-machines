import { HeatPumpModelGenerated } from "../../backend/schema/heat_pump";
import { HeatPumpDryerModelGenerated } from "../../backend/schema/heat_pump_dryer";
import { HeatPumpWaterHeaterModelGenerated } from "../../backend/schema/heat_pump_water_heater";

export type FieldMetadata = { description: string };
export type SpecsMetadata<T> = { [K in keyof T]: FieldMetadata };

// TODO: dedupe these and tie more closely to the source schema.
export const HEAT_PUMP_METADATA: SpecsMetadata<HeatPumpModelGenerated> = {
  modelNumber: {
    description:
      "Required field. The appliance's model number. Will typically correspond to an entire column or row in the table.",
  },
  modelVariant: {
    description:
      "An optional, more fine-grained number similar to the model number that describes the type of appliance.",
  },
  tonnage: {
    description:
      "The nominal tonnage of the appliance. Format as a number even if it is supplied as a string.",
  },
  weight: {
    description:
      "The weight or operating weight of the appliance. If found, this should given as a nested object with keys 'value' for the numeric amount and 'unit' for the measurement unit, which will either be 'kg' for kilograms, 'lb' for pounds, or 'other' for other units.",
  },
  dimensions: {
    description:
      "The operating length, width, or height of the equipment. If found, this should be given as a nested object with keys 'length', 'width', 'height', and 'unit', where the unit will be one of 'in' for inches, 'ft' for feet, 'cm' for centimeters', 'mm' for millimeters', and 'other' for other units.",
  },
  electricBreakerSize: {
    description:
      "The required breaker size for the equipment. May also be called Maximum Overcurrent Protection (MOP).",
  },
  voltage: {
    description:
      "The required voltage for the equipment. Common values are 120 or 240. Sometimes given along with phase and frequency such as 240-1-60, in which case it will be the first number.",
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
        "Required field. The appliance's model number. Will typically correspond to an entire column or row in the table.",
    },
    modelVariant: {
      description:
        "An optional, more fine-grained number similar to the model number that describes the type of appliance.",
    },
    tankCapacityGallons: {
      description: "The tank capacity in gallons.",
    },
    weight: {
      description:
        "The weight or operating weight of the appliance. If found, this should given as a nested object with keys 'value' for the numeric amount and 'unit' for the measurement unit, which will either be 'kilograms' or 'pounds'.",
    },
    dimensions: {
      description:
        "The operating length, width, or height of the equipment. If found, this should be given as a nested object with keys 'length', 'width', 'height', and 'unit', where the unit will be one of 'in' for inches, 'ft' for feet, 'cm' for centimeters', 'mm' for millimeters', and 'other' for other units.",
    },
    electricBreakerSize: {
      description:
        "The required breaker size for the equipment. May also be called Maximum Overcurrent Protection (MOP).",
    },
    voltage: {
      description:
        "The required voltage for the equipment. Common values are 120 or 240. Sometimes given along with phase and frequency such as 240-1-60, in which case it will be the first number.",
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
        "Required field. The appliance's model number. Will typically correspond to an entire column or row in the table.",
    },
    modelVariant: {
      description:
        "An optional, more fine-grained number similar to the model number that describes the type of appliance.",
    },
    capacity: {
      description: "The capacity of the dryer in cubic feet.",
    },
    weight: {
      description:
        "The weight or operating weight of the appliance. If found, this should given as a nested object with keys 'value' for the numeric amount and 'unit' for the measurement unit, which will either be 'kilograms' or 'pounds'.",
    },
    dimensions: {
      description:
        "The operating length, width, or height of the equipment. If found, this should be given as a nested object with keys 'length', 'width', 'height', and 'unit', where the unit will be one of 'in' for inches, 'ft' for feet, 'cm' for centimeters', 'mm' for millimeters', and 'other' for other units.",
    },
    electricBreakerSize: {
      description:
        "The required breaker size for the equipment. May also be called Maximum Overcurrent Protection (MOP).",
    },
    voltage: {
      description:
        "The required voltage for the equipment. Common values are 120 or 240. Sometimes given along with phase and frequency such as 240-1-60, in which case it will be the first number.",
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
