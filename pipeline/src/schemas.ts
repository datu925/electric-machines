// TODO: move to JSON schema which will avoid some of this redundancy.
export const DATA_FIELDS: string[] = [
  "tonnage",
  "shipping_weight_lbs",
  "operating_weight_lbs",
  "operating_size_length_inches",
  "operating_size_width_inches",
  "operating_size_height_inches",
  "operating_size_length_mm",
  "operating_size_width_mm",
  "operating_size_height_mm",
  "sound_level_db_min",
  "sound_level_db_max ",
];

export type Specs = {
  model_number: string;
  tonnage?: number;
  shipping_weight_lbs?: number;
  operating_weight_lbs?: number;
  operating_size_length_inches?: number;
  operating_size_width_inches?: number;
  operating_size_height_inches?: number;
  operating_size_length_mm?: number;
  operating_size_width_mm?: number;
  operating_size_height_mm?: number;
  sound_level_db_min?: number;
  sound_level_db_max?: number;
};

export type FieldMetadata = { description: string };
export type SpecsMetadata = { [K in keyof Specs]: FieldMetadata };

export const METADATA: SpecsMetadata = {
  model_number: {
    description:
      "Reqired field. The appliance's model number. Will typically correspond to an entire column or row in the table.",
  },
  tonnage: {
    description: "The nominal tonnage of the appliance.",
  },
  shipping_weight_lbs: {
    description: "The weight of the appliance when shipped.",
  },
  operating_weight_lbs: {
    description: "The weight of the equipment itself.",
  },
  operating_size_length_inches: {
    description: "The operating length of the equipment in inches.",
  },
  operating_size_width_inches: {
    description: "The operating width of the equipment in inches.",
  },
  operating_size_height_inches: {
    description: "The operating height of the equipment in inches.",
  },
  operating_size_length_mm: {
    description: "The operating length of the equipment in millimeters.",
  },
  operating_size_width_mm: {
    description: "The operating width of the equipment in millimeters.",
  },
  operating_size_height_mm: {
    description: "The operating height of the equipment in millimeters.",
  },
  sound_level_db_min: {
    description: "The minimum sound level in decibels.",
  },
  sound_level_db_max: {
    description: "The maximum sound level in decibels.",
  },
};

export type IdentifierToSpecs = { [index: string]: Specs };
export type IdentifierToModels = { [index: string]: Specs[] };
