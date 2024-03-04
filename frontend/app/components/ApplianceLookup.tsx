"use client";

import React, { useState, useMemo } from "react";
import styles from "./ApplianceLookup.module.scss";
import TableContainer from "./TableContainer";
import InfoSquare from "./InfoSquare";

const MachineLookup = () => {
  const [selectedAppliance, setSelectedAppliance] = useState("");
  const [showResults, setShowResults] = useState(false);

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

  //default values
  const [uef, setUef] = useState("2.0");
  const [fhr, setFhr] = useState("80");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setShowResults(false);
    setSelectedAppliance(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowResults(true);
  };

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
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.radioGroup}>
            <label className={styles.labelWithInfo} htmlFor="household-size">
              <InfoSquare text="Reflects the number of people in your home, impacting hot water demand." />
              <span>&nbsp;Household Size </span>
            </label>

            <div>
              <div className={styles.radioOptions}>
                <label htmlFor="size1-2">
                  <input
                    type="radio"
                    id="size1-2"
                    name="household-size"
                    value="1-2"
                    className={styles.radioInput}
                  />
                  <span className={styles.radioText}>1-2 people</span>
                </label>

                <label htmlFor="size3-4">
                  <input
                    type="radio"
                    id="size3-4"
                    name="household-size"
                    value="3-4"
                    className={styles.radioInput}
                  />
                  <span className={styles.radioText}>3-4 people</span>
                </label>

                <label htmlFor="size5-6">
                  <input
                    type="radio"
                    id="size5-6"
                    name="household-size"
                    value="5-6"
                    className={styles.radioInput}
                  />
                  <span className={styles.radioText}>5-6 people</span>
                </label>

                <label htmlFor="size7-more">
                  <input
                    type="radio"
                    id="size7-more"
                    name="household-size"
                    value="7+"
                    className={styles.radioInput}
                  />
                  <span className={styles.radioText}>7+ people</span>
                </label>
              </div>
            </div>
          </div>
          <div className={styles.sliderGroup}>
            <label className={styles.labelWithInfo} htmlFor="uef-slider">
              <InfoSquare text="Measures overall energy efficiency, influencing long-term energy costs." />
              &nbsp;Uniform Energy Factor (UEF): {uef}
            </label>
            <input
              type="range"
              id="uef-slider"
              name="uef"
              min="0.90"
              max="3.00"
              step="0.1"
              value={uef}
              onChange={(e) => setUef(e.target.value)}
              className={styles.slider}
            />
          </div>
          <div className={styles.sliderGroup}>
            <label className={styles.labelWithInfo} htmlFor="fhr-slider">
              <InfoSquare text="Estimates hot water supply in the first hour, crucial for peak demand." />
              &nbsp;First Hour Rating (FHR): {fhr} gallons
            </label>
            <input
              type="range"
              id="fhr-slider"
              name="fhr"
              min="40"
              max="120"
              step="10"
              value={fhr}
              onChange={(e) => setFhr(e.target.value)}
              className={styles.slider}
            />
          </div>
          <div>
            <input
              className={styles.submitButton}
              type="submit"
              value="Start Lookup"
            />
          </div>
        </form>
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
