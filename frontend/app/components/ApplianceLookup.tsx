"use client";

import React, { useState } from "react";
import styles from "./ApplianceLookup.module.scss";
import HeatPumpWaterHeater from "./appliances/HeatPumpWaterHeater";
import HeatPumpDryer from "./appliances/HeatPumpDryer";
import HeatPumpHVAC from "./appliances/HeatPumpHVAC";

const MachineLookup = () => {
  const [selectedAppliance, setSelectedAppliance] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAppliance(event.target.value);
  };

  return (
    <>
      <label id="appliance-type">Please select the appliance type:</label>
      <br />
      <select
        className={styles.dropdown}
        value={selectedAppliance}
        onChange={handleChange}
        id="appliance-type"
        aria-labelledby="appliance-type"
      >
        <option value="">Select Appliance</option>
        <option value="HeatPumpWaterHeater">Heat Pump Water Heater</option>
        <option value="HeatPumpHVAC">Heat Pump HVAC</option>
        <option value="HeatPumpDryer">Heat Pump Dryer</option>
      </select>

      {selectedAppliance === "HeatPumpHVAC" && <HeatPumpHVAC />}
      {selectedAppliance === "HeatPumpWaterHeater" && <HeatPumpWaterHeater />}
      {selectedAppliance === "HeatPumpDryer" && <HeatPumpDryer />}
    </>
  );
};

export default MachineLookup;
