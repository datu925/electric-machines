import { t } from "tap";
import { FieldMetadata } from "../src/schemas";
import { renderSchemaGuide, renderSystemPrompt } from "../src/prompt";

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
  
You will be given the output of a table that was read from a PDF and converted
to JSON. The tables contain technical specifications about heat pumps.
The tables may contain data for multiple appliance models, and your task is to
return valid JSON that matches the following schema, with one record per
appliance. All values in the schema are optional except the modelNumber. Do not
return null values. The key for this output should be "data".

You should also output the mapping you construct from column names
in the tables to the fields in the schema. It is not expected that you will use
all of the columns in the table. The key for this output should be "mapping".

If there are numeric row/column numbers in the table, you can ignore them.
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
