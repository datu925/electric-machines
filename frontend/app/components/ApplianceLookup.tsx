"use client";

import React, { useState, useMemo } from "react";
import styles from "./ApplianceLookup.module.scss";
import TableContainer from "./TableContainer";
// import InfoSquare from "./InfoSquare";
import HeatPumpWaterHeaterForm from "./appliances-forms/HeatPumpWaterHeaterForm";

const MachineLookup = () => {
  const [selectedAppliance, setSelectedAppliance] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setShowResults(false);
    setSelectedAppliance(event.target.value);
  };

  const [results, setResults] = useState([
    {
      brand: "BrandA",
      id: 1,
      model: "GEH50DFEJ2RA",
      capacity: 60,
      fhr: 60,
      uef: 2.6,
    },
    {
      brand: "BrandB",
      id: 2,
      model: "HP10-80H42DV",
      capacity: 70,
      fhr: 70,
      uef: 2.7,
    },
    {
      brand: "BrandC",
      id: 3,
      model: "RE2H80R10B-12CWT",
      capacity: 70,
      fhr: 50,
      uef: 2.8,
    },
    {
      brand: "BrandD",
      id: 4,
      model: "RE22SR10B-12CWT",
      capacity: 60,
      fhr: 60,
      uef: 2.9,
    },
  ]);

  const columns = useMemo(
    () => [
      {
        Header: "Brand",
        accessor: "brand",
      },
      {
        Header: "Model",
        accessor: "model",
      },
      {
        Header: "Capacity",
        accessor: "capacity",
      },
      {
        Header: "UEF",
        accessor: "uef",
      },
      {
        Header: "FHR",
        accessor: "fhr",
      },
    ],
    []
  );
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
      {selectedAppliance === "HeatPumpDryer" && <p>Not yet implemented!</p>}

      {selectedAppliance === "HeatPumpWaterHeater" && (
        <HeatPumpWaterHeaterForm />
      )}
      {showResults && (
        <>
          {/* <div>{JSON.stringify(results)}</div>*/}
          <TableContainer columns={columns} data={results} />
        </>
      )}
    </>
  );
};

export default MachineLookup;
