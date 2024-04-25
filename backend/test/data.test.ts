import { t as tap } from "tap";
import { RAW_WATER_HEATERS, RAW_DRYERS, RAW_HEATPUMPS } from "../src/dbutil";
import { HEAT_PUMP_WATER_HEATER_SCHEMA } from "../schema/heat_pump_water_heater";
import { HEAT_PUMP_DRYER_SCHEMA } from "../schema/heat_pump_dryer";
import { HEAT_PUMP_SCHEMA } from "../schema/heat_pump";
import { Appliance } from "../schema/appliance";
import { SomeJSONSchema } from "ajv/dist/types/json-schema";
import Ajv from "ajv";
import util from "util";

const TESTS: [Appliance[], SomeJSONSchema, string][] = [
  [RAW_HEATPUMPS, HEAT_PUMP_SCHEMA, "heat pumps"],
  [RAW_DRYERS, HEAT_PUMP_DRYER_SCHEMA, "dryers"],
  [RAW_WATER_HEATERS, HEAT_PUMP_WATER_HEATER_SCHEMA, "water heaters"],
];

tap.test("all persisted data matches the appropriate schema", (tap) => {
  const ajv = new Ajv();
  TESTS.forEach(([appliances, schema, label]) => {
    for (const appliance of appliances) {
      if (!tap.ok(ajv.validate(schema, appliance))) {
        console.error(label, util.inspect(ajv.errors, { depth: null }));
      }
    }
  });
  tap.end();
});
