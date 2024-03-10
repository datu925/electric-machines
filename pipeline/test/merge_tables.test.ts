import { t } from "tap";
import {
  Table,
  filterTables,
  mergeTablesByModelNumber,
} from "../src/table_merger";

t.test("merge simple json files, first key wins", (t) => {
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
      operating_weight_lbs: 180,
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

t.test("merge different versions of same model number", (t) => {
  const specs: Table[] = [
    {
      model_number: "RP18AZ60AJVC",
      tonnage: 3,
    },
    {
      model_number: "RP18AZ60AJVCA",
      operating_weight_lbs: 180,
    },
  ];
  const merged = mergeTablesByModelNumber(specs, "rheem");
  const expected: Table[] = [
    {
      model_number: "RP18AZ60AJVC",
      tonnage: 3,
      operating_weight_lbs: 180,
    },
  ];
  t.matchOnlyStrict(merged, expected);
  t.end();
});

t.test("reject invalid tables", (t) => {
  const tables: Table[] = [
    {
      reason: "no model number",
      tonnage: 3,
    },
    {
      reason: "null model number",
      model_number: null,
      tonnage: 3,
    },
    {
      reason: "space in model number",
      model_number: "SEIJEF 2024",
      tonnage: 3,
    },
    {
      model_number: "only_model_number",
    },
  ];
  t.equal(filterTables(tables).length, 0);
  t.end();
});
