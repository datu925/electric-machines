import { FieldMetadata, SpecsMetadata } from "./schemas";

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

export function renderSystemPrompt<T>(metadata: SpecsMetadata<T>) {
  const system: string = `You are a helpful assistant.
  
You will be given the output of a table that was read from a PDF and converted
to JSON. The tables contain technical specifications about heat pumps.
The tables may contain data for multiple appliance models, and your task is to
return valid JSON with one key-value record per model. 

There is a schema with fields you can try to match, but you can include data from the
tables that is not in the schema. Do not return null values. The only required field is
modelNumber. The key for this output should be "data".

You should also output the mapping you construct from column names
in the tables to the fields in the schema. The key for this output should be "mapping".

If there are numeric row/column numbers in the table, you can ignore them.
If the table is empty of any meaningful data, you can return an empty object for
the data and mapping keys.

${renderSchemaGuide(metadata)}`;
  return system;
}

export const EXAMPLE_1_INPUT: string = `{"0":{"0":"Physical Data","1":"Model No.#","2":"Nominal Tonnage","3":"Valve Connections","4":"Compressor Type","5":"watts","6":"Shipping weight \\u2013 lbs.","7":"Operating  weight \\u2013 lbs."},
"1":{"0":"","1":"RP1418","2":"1.5","3":"","4":"Scroll","5":"151","6":"159","7":"152"},
"2":{"0":"","1":"RP1424","2":"2.0","3":"","4":"","5":"156","6":"152","7":"145"},
"3":{"0":"","1":"RP1430","2":"2.5","3":"","4":"","5":"142","6":"208","7":"201"}}
`;

export const EXAMPLE_1_OUTPUT: string = `{
  "data": [
    {
      "modelNumber": "RP1418",
      "tonnage": 1.5,
      "compressorType": "Scroll",
      "watts": 151,
      "shippingWeightLbs": 159,
      "operatingWeightLbs": 152
    },
    {
      "modelNumber": "RP1424",
      "tonnage": 2.0,
      "watts": 156,
      "shippingWeightLbs": 152,
      "operatingWeightLbs": 145
    },
    {
      "modelNumber": "RP1430",
      "tonnage": 2.5,
      "watts": 142,
      "shippingWeightLbs": 208,
      "operatingWeightLbs": 201
    }
  ],
  "mapping": {
    "Model No.#": "modelNumber",
    "Nominal Tonnage": "tonnage",
    "Compressor Type": "compressorType",
    "watts": "watts",
    "Shipping weight \\u2013 lbs.": "shippingWeightLbs",
    "Operating weight \\u2013 lbs.": "operatingWeightLbs"
  }
}`;
