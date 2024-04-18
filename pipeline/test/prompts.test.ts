import { t } from "tap";
import { FieldMetadata } from "../src/schemas";
import { renderSchemaGuide, renderSystemPrompt } from "../src/prompts/prompts";

t.test("render schema correctly", (t) => {
  const metadata: { [index: string]: FieldMetadata } = {
    some_field: { description: "required; must include." },
    other_field: { description: "this one is optional." },
  };

  const expected = `Schema: {
  some_field: required; must include.
  other_field: this one is optional.
}
`;

  t.strictSame(renderSchemaGuide(metadata), expected);
  t.end();
});

t.test("render prompt correctly", (t) => {
  const metadata: { [index: string]: FieldMetadata } = {
    some_field: { description: "required; must include." },
    other_field: { description: "this one is optional." },
  };

  const expected = `You are a helpful assistant.
  
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

Schema: {
  some_field: required; must include.
  other_field: this one is optional.
}
`;

  t.strictSame(renderSystemPrompt(metadata), expected);
  t.end();
});
