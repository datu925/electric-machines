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

export const TABLE_REFORMAT_PROMPT = `You are a helpful assistant.
  
You will be given the output of a table that was read from a PDF and converted
to JSON. The tables contain technical specifications about appliances, with possibly
more than one appliance in the tables. Your task is to reformat the tables into
valid JSON with one key-value record per model. Return an array even if there is only
one record.

The only required field is modelNumber. Even if you don't see a column with that name,
try to find a similarly named column and use that. Otherwise, use the column names in the
PDF. You can omit columns that don't have any data in them.

If the table is empty of any meaningful data or does not contain any model numbers,
you can return an empty object.

If there are numeric row/column numbers in the table, you can ignore them.
`;

export function renderSystemPrompt<T>(metadata: SpecsMetadata<T>) {
  const system: string = `You are a helpful assistant.
  
You will be given JSON input that contains technical specifications for
appliances such as heat pumps or clothes dryers. Each record describes one
appliance. Your task is to fit that data to the schema below and return one
transformed record per original record.

Do not return null values. Ultimately, if you can't find a good fit for a field,
it's okay to leave it blank.

Put all converted records in an array, with the JSON key called "data".

You should also output the mapping you construct from column names
in the input to the fields in the schema. Only give the mapping for fields that
you use. The key for this output should be "mapping".

If the table is empty of any meaningful data, you can return an empty object for
the data and mapping keys.

${renderSchemaGuide(metadata)}`;
  return system;
}

export const REFORMAT_EXAMPLE_1_INPUT: string = `{"0":{"0":"Physical Data","1":"Model No.#","2":"Nominal Tonnage","3":"Valve Connections","4":"Compressor Type","5":"watts","6":"Shipping weight \\u2013 lbs.","7":"Operating  weight \\u2013 lbs."},
"1":{"0":"","1":"RP1418","2":"1.5","3":"","4":"Scroll","5":"151","6":"159","7":"152"},
"2":{"0":"","1":"RP1424","2":"2.0","3":"","4":"","5":"156","6":"152","7":"145"},
"3":{"0":"","1":"RP1430","2":"2.5","3":"","4":"","5":"142","6":"208","7":"201"}}
`;

export const REFORMAT_EXAMPLE_1_OUTPUT: string = `[
  {
    "modelNumber": "RP1418",
    "Nominal Tonnage": 1.5,
    "Compressor Type": "Scroll",
    "watts": 151,
    "Shipping weight \\u2013 lbs.": 159,
    "Operating  weight \\u2013 lbs.": 152
  },
  {
    "modelNumber": "RP1424",
    "Nominal Tonnage": 2.0,
    "watts": 156,
    "Shipping weight \\u2013 lbs.": 152,
    "Operating  weight \\u2013 lbs.": 145
  },
  {
    "modelNumber": "RP1430",
    "Nominal Tonnage": 2.5,
    "watts": 142,
    "Shipping weight \\u2013 lbs.": 208,
    "Operating  weight \\u2013 lbs.": 201
  }
]`;

export const MAPPING_EXAMPLE_1_INPUT: string = `[
  {
    "modelNumber": "RP1418",
    "Nominal Tonnage": 1.5,
    "Compressor Type": "Scroll",
    "watts": 151,
    "Shipping weight \\u2013 kg.": 159,
    "Operating  weight \\u2013 kg.": 152
  },
  {
    "modelNumber": "RP1424",
    "Nominal Tonnage": 2.0,
    "watts": 156,
    "Shipping weight \\u2013 kg.": 152,
    "Operating  weight \\u2013 kg.": 145
  },
  {
    "modelNumber": "RP1430",
    "Nominal Tonnage": 2.5,
    "watts": 142,
    "Shipping weight \\u2013 kg.": 208,
    "Operating  weight \\u2013 kg.": 201
  }
]`;

export const MAPPING_EXAMPLE_1_OUTPUT: string = `{
  "data": {
    [
      {
        "modelNumber": "RP1418",
        "tonnage": 1.5,
        "weightInKg": 152
      },
      {
        "modelNumber": "RP1424",
        "tonnage": 2.0,
        "weightInKg": 145
      },
      {
        "modelNumber": "RP1430",
        "tonnage": 2.5,
        "weightInKg": 201
      }
    ]
  },
  "mapping": {
    "modelNumber": "modelNumber",
    "Nominal Tonnage": "tonnage",
    "Operating weight \\u2013 kg.": "weightInKg"
  }
}`;
