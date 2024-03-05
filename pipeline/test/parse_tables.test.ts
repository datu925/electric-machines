import { t } from "tap";
import { Specs } from "../src/schemas";
import { mergeTablesByModelNumber } from "../src/table_merger";

t.test("merge simple json files, overwriting", (t) => {
  const specs: Specs[] = [
    {
      model_number: "foo",
      tonnage: 3,
      shipping_weight_lbs: 180,
    },
    {
      model_number: "foo",
      tonnage: 3,
      operating_weight_lbs: 180,
    },
    {
      model_number: "foo",
      tonnage: 3,
      operating_weight_lbs: 200,
    },
    {
      model_number: "bar",
      tonnage: 5,
      shipping_weight_lbs: 180,
    },
  ];
  const merged = mergeTablesByModelNumber(specs);
  const expected: Specs[] = [
    {
      model_number: "foo",
      tonnage: 3,
      shipping_weight_lbs: 180,
      operating_weight_lbs: 200,
    },
    {
      model_number: "bar",
      tonnage: 5,
      shipping_weight_lbs: 180,
    },
  ];
  t.matchOnlyStrict(merged, expected);
  t.end();
});
