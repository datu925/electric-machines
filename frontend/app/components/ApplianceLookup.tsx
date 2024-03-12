"use client";

import React, { useState, useMemo } from "react";
import styles from "./ApplianceLookup.module.scss";
// import InfoSquare from "./InfoSquare";
import HeatPumpWaterHeaterForm from "./appliances-forms/HeatPumpWaterHeaterForm";
import HeatPumpDryer from "./appliances-forms/HeatPumpDryer";

const MachineLookup = () => {
  const [selectedAppliance, setSelectedAppliance] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setShowResults(false);
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

      {selectedAppliance === "HeatPumpHVAC" && <p>Not yet implemented!</p>}

      {selectedAppliance === "HeatPumpWaterHeater" && (
        <HeatPumpWaterHeaterForm />
      )}
      {selectedAppliance === "HeatPumpDryer" && <HeatPumpDryer />}
    </>
  );
};

export default MachineLookup;
