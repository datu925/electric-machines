import InfoSquare from "../InfoSquare";
// import styles from "../ApplianceLookup.module.scss";
import styles from "./sharedForms.module.scss";
import { useState } from "react";

const HeatPumpWaterHeaterForm = () => {
  const [showResults, setShowResults] = useState(false);

  //default values
  const [uef, setUef] = useState("2.0");
  const [fhr, setFhr] = useState("80");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowResults(true);
  };
  return (
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
  );
};

export default HeatPumpWaterHeaterForm;
