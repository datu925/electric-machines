"use client";

import React, { useState } from "react";
import styles from "./ApplianceLookup.module.scss";

const MachineLookup = () => {
  const [selectedAppliance, setSelectedAppliance] = useState("");
  const [showResults, setShowResults] = useState(false);

  //default values
  const [uef, setUef] = useState("1.95");
  const [fhr, setFhr] = useState("80");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAppliance(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowResults(true);
  };

  return (
    <>
      <select
        className={styles.dropdown}
        value={selectedAppliance}
        onChange={handleChange}
      >
        <option value="">Select Appliance</option>
        <option value="HeatPumpWaterHeater">Heat Pump Water Heater</option>
        <option value="HeatPumpHVAC">Heat Pump HVAC</option>
        <option value="HeatPumpDryer">Heat Pump Dryer</option>
      </select>

      {selectedAppliance === "HeatPumpWaterHeater" && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.radioGroup}>
            <label htmlFor="household-size">Household Size:</label>
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
            <label htmlFor="uef-slider">
              Uniform Energy Factor (UEF): {uef}
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
            <label htmlFor="fhr-slider">
              First Hour Rating (FHR): {fhr} gallons
            </label>
            <input
              type="range"
              id="fhr-slider"
              name="fhr"
              min="40"
              max="120"
              step="1"
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
      {showResults && <div>results</div>}
    </>
  );
};

export default MachineLookup;
