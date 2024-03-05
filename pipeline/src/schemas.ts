// TODO: flesh out into actual schema.
/*
model_number: string. Reqired field. The appliance's model number. Will typically correspond to an entire column or row in the table.
tonnage: number. The nominal tonnage of the appliance.
shipping_weight_lbs: number. The weight of the appliance when shipped.
operating_weight_lbs: number. The weight of the equipment itself.
*/
export type Specs = { [index: string]: string | number };
export type IdentifierToSpecs = { [index: string]: Specs };
