import { t } from "tap";
import {
  Table,
  filterTables,
  mergeTablesByModelNumber,
} from "../src/table_merger";

t.test("merge simple json files, first key wins", (t) => {
  const specs: Table[] = [
    {
      modelNumber: "foo",
      tonnage: 3,
      shipping_weight_lbs: 180,
    },
    {
      modelNumber: "foo",
      tonnage: 3,
      operating_weight_lbs: 180,
    },
    {
      modelNumber: "foo",
      tonnage: 3,
      operating_weight_lbs: 200,
    },
    {
      modelNumber: "bar",
      tonnage: 5,
      shipping_weight_lbs: 180,
    },
  ];
  const merged = mergeTablesByModelNumber(specs);
  const expected: Table[] = [
    {
      modelNumber: "foo",
      tonnage: 3,
      shipping_weight_lbs: 180,
      operating_weight_lbs: 180,
    },
    {
      modelNumber: "bar",
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
      modelNumber: "RP18AZ60AJVC",
      tonnage: 3,
    },
    {
      modelNumber: "RP18AZ60AJVCA",
      operating_weight_lbs: 180,
    },
  ];
  const merged = mergeTablesByModelNumber(specs, "Rheem");
  const expected: Table[] = [
    {
      modelNumber: "RP18AZ60AJVC",
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
      modelNumber: null,
      tonnage: 3,
    },
    {
      reason: "space in model number",
      modelNumber: "SEIJEF 2024",
      tonnage: 3,
    },
    {
      modelNumber: "only_model_number",
    },
  ];
  t.equal(filterTables(tables).length, 0);
  t.end();
});
