import { METADATA, FieldMetadata } from "./schemas";

export function renderSchemaGuide(specs: {
  [index: string]: FieldMetadata;
}): string {
  let output = "Schema: {\n";
  for (const [key, metadata] of Object.entries(specs)) {
    output += `  ${key}: ${metadata.description}\n`;
  }
  output += "}\n";
  return output;
}

export const SYSTEM: string = `You are a helpful assistant.

You will be given the output of a table that was read from a PDF and converted
to JSON. The tables contain technical specifications about heat pumps.
The tables may contain data for multiple appliance models, and your task is to
return valid JSON that matches the following schema, with one record per
appliance. All values in the schema are optional except the model_number. Do not
return null values. The key for this output should be "data".

You should also output the mapping you construct from column names
in the tables to the fields in the schema. It is not expected that you will use
all of the columns in the table. The key for this output should be "mapping".

If there are numeric row/column numbers in the table, you can ignore them.
If the table is empty of any meaningful data, you can return an empty object for
the data and mapping keys.

${renderSchemaGuide(METADATA)}
`;

export const EXAMPLE_1_INPUT: string = `{"0":{"0":"Physical Data","1":"Model No.#","2":"Nominal Tonnage","3":"Valve Connections","4":"Liquid Line O.D. \\u2013 in.","5":"Suction Line O.D. \\u2013 in.","6":"Refrigerant (R410A) furnished oz.\\u00b9","7":"Compressor Type","8":"Outdoor Coil","9":"Net face area \\u2013 Outer Coil","10":"Net face area \\u2013 Inner Coil","11":"Tube diameter \\u2013 in.","12":"Number of rows","13":"Fins per inch","14":"Outdoor Fan","15":"Diameter \\u2013 in.","16":"Number of blades","17":"Motor hp","18":"CFM","19":"RPM","20":"watts","21":"Shipping weight \\u2013 lbs.","22":"Operating  weight \\u2013 lbs."},
"1":{"0":"","1":"RP1418","2":"1.5","3":"","4":"3\\/8","5":"3\\/4","6":"123","7":"Scroll","8":"","9":"11.14","10":"\\u2014","11":"3\\/8","12":"1","13":"20","14":"","15":"20","16":"2","17":"1\\/8","18":"2478","19":"1077","20":"151","21":"159","22":"152"},
"2":{"0":"","1":"RP1424","2":"2.0","3":"","4":"3\\/8","5":"3\\/4","6":"89","7":"","8":"","9":"9.1","10":"\\u2014","11":"3\\/8","12":"1","13":"20","14":"","15":"20","16":"2","17":"1\\/8","18":"2410","19":"1077","20":"156","21":"152","22":"145"},
"3":{"0":"","1":"RP1430","2":"2.5","3":"","4":"3\\/8","5":"3\\/4","6":"106","7":"","8":"","9":"11.1","10":"\\u2014","11":"3\\/8","12":"1","13":"20","14":"","15":"20","16":"3","17":"1\\/8","18":"2535","19":"1077","20":"142","21":"208","22":"201"}}
`;

export const EXAMPLE_1_OUTPUT: string = `{
  "data": [
    {
      "model_number": "RP1418",
      "tonnage": 1.5,
      "shipping_weight_lbs": 159,
      "operating_weight_lbs": 152,
    },
    {
      "model_number": "RP1424",
      "tonnage": 2.0,
      "shipping_weight_lbs": 152,
      "operating_weight_lbs": 145,
    },
    {
      "model_number": "RP1430",
      "tonnage": 2.5,
      "shipping_weight_lbs": 208,
      "operating_weight_lbs": 201,
    }
  ],
  "mapping": {
    "Model No.#": "model_number",
    "Nominal Tonnage": "tonnage",
    "Shipping weight \\u2013 lbs.": "shipping_weight_lbs",
    "Operating weight \\u2013 lbs.": "operating_weight_lbs",
  }
}`;
