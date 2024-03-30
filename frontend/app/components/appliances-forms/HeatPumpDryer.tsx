import InfoSquare from "../InfoSquare";
import styles from "./sharedForms.module.scss";
import { useState, useMemo } from "react";
import "./tabulator-modern-custom.css";
// import "react-tabulator/lib/styles.css";
import { ReactTabulator, ColumnDefinition } from "react-tabulator";

const HeatPumpDryer = () => {
  const [showResults, setShowResults] = useState(false);

  //default values
  const [combinedEnergyFactor, setCombinedEnergyFactor] = useState("7.0");
  const [capacity, setCapacity] = useState("6.0");
  const [soundLevelMin, setsoundLevelMin] = useState("62");

  //sample API call
  //electric-machines-h6x1.vercel.app/api/v1/appliance?applianceType=hpd&soundLevelMax=62&combinedEnergyFactor=7.0&capacity=6.0

  //sample API results
  // {
  //   brandName: "Rheem",
  //   modelNumber: "XJ-75F",
  //   modelVariant: "701460",
  //   weightInKg: 71.214,
  //   widthInCm: 50,
  //   heightInCm: 160.02,
  //   lengthInCm: 50,
  //   electricBreakerSize: 3.67,
  //   voltage: 120,
  //   soundLevelMin: 63,
  //   combinedEnergyFactor: 5,
  //   capacity: 7,
  // }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const apiUrl =
      "https://electric-machines-h6x1.vercel.app/api/v1/appliance?applianceType=hpd&soundLevelMin=62&combinedEnergyFactor=7.0&capacity=6.0";
    const response = await fetch(apiUrl);
    const data = await response.json();
    setResults(data);
    setShowResults(true);
  };

  const [results, setResults] = useState([]);

  const columns: ColumnDefinition[] = [
    { title: "Brand", field: "brandName", minWidth: 120 },
    { title: "Model", field: "modelNumber", hozAlign: "left", minWidth: 120 },
    {
      title: "Capacity (cu-ft)",
      field: "capacity",
      hozAlign: "center",
      minWidth: 150,
    },
    {
      title: "CEF",
      field: "combinedEnergyFactor",
      hozAlign: "center",
      minWidth: 100,
    },
    {
      title: "Noise Level (dB)",
      field: "soundLevelMin",
      hozAlign: "center",
      minWidth: 150,
    },
  ];

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.sliderGroup}>
          <label className={styles.labelWithInfo} htmlFor="capacity-slider">
            <InfoSquare text="Capacity refers to the volume of clothes the dryer can hold and dry efficiently, usually measured in cubic feet. A larger capacity is ideal for big households or doing less frequent, larger loads." />
            &nbsp;Capacity: {capacity} cu-ft
          </label>
          <input
            type="range"
            id="capacity-slider"
            name="capacity"
            min="3"
            max="9"
            step="0.5"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className={styles.slider}
          />
        </div>

        <div className={styles.sliderGroup}>
          <label className={styles.labelWithInfo} htmlFor="cef-slider">
            <InfoSquare text="A higher CEF means better energy efficiency, leading to lower operating costs over time. Consider this factor for long-term savings." />
            &nbsp;Combined Energy Factor (CEF): {combinedEnergyFactor}
          </label>
          <input
            type="range"
            id="cef-slider"
            name="cef"
            min="3"
            max="10"
            step="0.5"
            value={combinedEnergyFactor}
            onChange={(e) => setCombinedEnergyFactor(e.target.value)}
            className={styles.slider}
          />
        </div>
        <div className={styles.radioGroup}>
          <label className={styles.labelWithInfo} htmlFor="noise-level">
            <InfoSquare text="High noise levels are louder and might be more noticeable, but these models can be more cost-effective and are best placed in separate utility areas, away from living spaces." />
            <span>&nbsp;Noise Level </span>
          </label>

          <div>
            <div className={styles.radioOptions}>
              <label htmlFor="noiseExtraSilent">
                <input
                  type="radio"
                  id="noiseExtraSilent"
                  name="noise-level"
                  value="extraSilent"
                  className={styles.radioInput}
                />
                <span className={styles.radioText}>
                  Extra Silent(&lt;62 dB)
                </span>
              </label>
              <label htmlFor="noiseSilent">
                <input
                  type="radio"
                  id="noiseSilent"
                  name="noise-level"
                  value="Silent"
                  className={styles.radioInput}
                />
                <span className={styles.radioText}>Silent(63-64dB)</span>
              </label>

              <label htmlFor="noiseNormal">
                <input
                  type="radio"
                  id="noiseNormal"
                  name="noise-level"
                  value="Normal"
                  className={styles.radioInput}
                />
                <span className={styles.radioText}>Normal(65-66dB)</span>
              </label>

              <label htmlFor="noiseLoud">
                <input
                  type="radio"
                  id="noiseLoud"
                  name="noise-level"
                  value="Loud"
                  className={styles.radioInput}
                />
                <span className={styles.radioText}>Loud(&gt;67dB)</span>
              </label>
            </div>
          </div>
        </div>

        <div>
          <input
            className={styles.submitButton}
            type="submit"
            value="Start Lookup"
          />
        </div>
      </form>
      {/* layout={"fitData"} */}

      {showResults && (
        <div className={styles.resultTable}>
          <ReactTabulator
            data={results}
            columns={columns}
            options={{
              pagination: "local",
              paginationSize: 5,
            }}
          />
        </div>
      )}
    </>
  );
};

export default HeatPumpDryer;
