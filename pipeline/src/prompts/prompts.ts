import { FieldMetadata, SpecsMetadata } from "../schemas";

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
  
You will be given a series of tables that were read from a PDF and converted
to JSON. The tables contain technical specifications about appliances, with possibly
more than one appliance in the tables. Your task is to reformat the tables into
valid JSON with one key-value record per appliance model. Return an array even if there is only
one record.

The only required field is modelNumber. Even if you don't see a column with that name,
try to find a similarly named column and use that. Otherwise, use the column names in the
PDF. You can omit columns that don't have any data in them.

Some tables may not have a model number, but if they follow a table that does, it's possible
that table is a continuation of the previous table, and if it has the same
number of columns as the previous table, you can use the same model numbers.

If a table is empty of any meaningful data or does not contain any model numbers,
you can return an empty object.

If there are numeric row/column numbers in the tables, you can ignore them.

Please send the response in plain text without code formatting.
`;

export const REFORMAT_EXAMPLE_1_INPUT: string = `[[{"0":{"0":"Physical Data","1":"Model No.#","2":"Nominal Tonnage","3":"Valve Connections","4":"Compressor Type","5":"watts","6":"Shipping weight \\u2013 lbs.","7":"Operating  weight \\u2013 lbs."},
"1":{"0":"","1":"RP1418","2":"1.5","3":"","4":"Scroll","5":"151","6":"159","7":"152"},
"2":{"0":"","1":"RP1424","2":"2.0","3":"","4":"","5":"156","6":"152","7":"145"},
"3":{"0":"","1":"RP1430","2":"2.5","3":"","4":"","5":"142","6":"208","7":"201"}}],
[{"0":{"0":"Other Data","1":"Sound Level (decibels)","2":"Minimum Breaker Size"},
"1":{"0":"","1":"65","2":"15"},
"2":{"0":"","1":"68","2":"30"},
"3":{"0":"","1":"72","2":"30"}}]
]
`;

export const REFORMAT_EXAMPLE_1_OUTPUT: string = `[
  {
    "modelNumber": "RP1418",
    "Nominal Tonnage": 1.5,
    "Compressor Type": "Scroll",
    "watts": 151,
    "Shipping weight \\u2013 lbs.": 159,
    "Operating  weight \\u2013 lbs.": 152,
    "Sound Level (decibels)": 65,
    "Minimum Breaker Size": 15
  },
  {
    "modelNumber": "RP1424",
    "Nominal Tonnage": 2.0,
    "watts": 156,
    "Shipping weight \\u2013 lbs.": 152,
    "Operating  weight \\u2013 lbs.": 145,
    "Sound Level (decibels)": 68,
    "Minimum Breaker Size": 30
  },
  {
    "modelNumber": "RP1430",
    "Nominal Tonnage": 2.5,
    "watts": 142,
    "Shipping weight \\u2013 lbs.": 208,
    "Operating  weight \\u2013 lbs.": 201,
    "Sound Level (decibels)": 72,
    "Minimum Breaker Size": 30
  }
]`;

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
  "data": [
    {
      "modelNumber": "RP1418",
      "tonnage": 1.5,
      "weight": {
        "value": 152,
        "unit": "kg"
      }
    },
    {
      "modelNumber": "RP1424",
      "tonnage": 2.0,
      "weight": {
        "value": 145,
        "unit": "kg"
      }
    },
    {
      "modelNumber": "RP1430",
      "tonnage": 2.5,
      "weight": {
        "value": 201,
        "unit": "kg"
      }
    }
  ],
  "mapping": {
    "modelNumber": "modelNumber",
    "Nominal Tonnage": "tonnage",
    "Operating weight \\u2013 kg.": "weight"
  }
}`;

export function renderMissingDataPrompt(metadata: {
  [index: string]: FieldMetadata;
}) {
  const system: string = `You are a helpful assistant.
  
You will be given JSON input that contains technical specifications for
appliances such as heat pumps or clothes dryers. Each record describes one
appliance. The data is currently missing some fields. You'll also be given
the text of the PDF where the JSON data came from, and asked to fill in the
missing fields if you can find them. The PDF text might be somewhat messy and
include tables rendered as text.

Return your results in JSON format, with one record per original record. Include
the modelNumber key and then any new properties that you find. Do not include original
properties except for the modelNumber.

Ultimately, if you can't find a good fit for a field, it's okay to leave it blank.
Don't return null values; simply don't include the key for that field.

${renderSchemaGuide(metadata)}`;
  return system;
}

const missingExample1Text = `        RP14 Series

All models are 240 volts.

Physical Data                                            RP1418  RP1424  RP1430
                                                           1.5     2.0     2.5
  Model No
  Nominal Tonnage                                          3/8     3/8     3/8
  Valve Connections                                        3/4     3/4     3/4
                                                           123      89     106
                               Liquid Line O.D. - in.                             
                             Suction Line O.D. - in.      11.14    9.1     11.1
  Refrigerant (R410A) furnished oz.�                        --      --      --
  Compressor Type                                          3/8     3/8     3/8
                              watts                        151     156     142
                 Shipping weight - lbs.                    159     152     208
                 Operating weight - lbs.                   152     145     201

Other Data                                          
Sound Level (decibels)                                     65      68      72
Minimum Breaker Size                                       15      30      50
`;

export const MISSING_EXAMPLE_1_INPUT = `{
  "missingFields": ["voltage", "electricBreakerSize"],
  "records": [
    {
      "modelNumber": "RP1418",
      "weight": {
        "value": 159,
        "unit": "lb"
      },
      "soundLevelMin": 65,
      "soundLevelMax": 65
    },
    {
      "modelNumber": "RP1424",
      "weight": {
        "value": 159,
        "unit": "lb"
      },
      "soundLevelMin": 65,
      "soundLevelMax": 65
    },
    {
      "modelNumber": "RP1430",
      "weight": {
        "value": 159,
        "unit": "lb"
      },
      "soundLevelMin": 65,
      "soundLevelMax": 65
    }
  ],
  "text": "${missingExample1Text}"
}`;
export const MISSING_EXAMPLE_1_OUTPUT = `[
  {
    "modelNumber": "RP1418",
    "voltage": 240,
    "electricBreakerSize": 15
  },
  {
    "modelNumber": "RP1424",
    "voltage": 240,
    "electricBreakerSize": 30
  },
  {
    "modelNumber": "RP1430",
    "voltage": 240,
    "electricBreakerSize": 50
  }
]`;
