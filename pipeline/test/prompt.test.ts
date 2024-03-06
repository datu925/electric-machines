import { t } from "tap";
import { FieldMetadata } from "../src/schemas";
import { renderSchemaGuide } from "../src/prompt";

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

  t.matchOnlyStrict(renderSchemaGuide(metadata), expected);
  t.end();
});
