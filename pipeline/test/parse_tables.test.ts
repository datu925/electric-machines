import { t } from "tap";
import {
  Table,
  filterTables,
  mergeTablesByModelNumber,
} from "../src/table_merger";

t.test("merge simple json files, overwriting", (t) => {
  const specs: Table[] = [
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
  const expected: Table[] = [
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

t.test("filter tables with only nulls in our schema", (t) => {
  const table: Table[] = [
    {
      model_number: "foo",
      tonnage: null,
    },
  ];
  t.equal(filterTables(table).length, 0);
  t.end();
});
