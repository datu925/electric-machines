import InfoSquare from "../InfoSquare";
import styles from "./sharedForms.module.scss";
import { useState, useMemo } from "react";
import "./tabulator-modern-custom.css";
// import "react-tabulator/lib/styles.css";
import { ReactTabulator, ColumnDefinition } from "react-tabulator";

const HeatPumpDryer = () => {
  const [showResults, setShowResults] = useState(false);

  //default values
  const [cef, setCef] = useState("7.0");
  const [capacity, setCapacity] = useState("6.0");
  const [decibel, setDecibel] = useState("62");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowResults(true);
  };

  const [results, setResults] = useState([
    {
      brand: "Brand1",
      id: 1,
      model: "XJ-75F",
      capacity: 7,
      noise: "62",
      cef: 5,
    },
    {
      brand: "Brand2",
      id: 2,
      model: "QW-90G",
      capacity: 7.5,
      noise: "62",
      cef: 6,
    },
    {
      brand: "Brand3",
      id: 3,
      model: "LM-40K",
      capacity: 8,
      noise: "65",
      cef: 6.5,
    },
    {
      brand: "Brand4",
      id: 4,
      model: "AB-65R",
      capacity: 9,
      noise: "66",
      cef: 8,
    },
    {
      brand: "Brand5",
      id: 5,
      model: "Model-5Z",
      capacity: 7.5,
      noise: "67",
      cef: 9,
    },
    {
      brand: "Brand6",
      id: 6,
      model: "Model-6Z",
      capacity: 8.0,
      noise: "68",
      cef: 10,
    },
  ]);

  const columns: ColumnDefinition[] = [
    { title: "Brand", field: "brand" },
    { title: "Model", field: "model", hozAlign: "left" },
    {
      title: "Capacity (cu-ft)",
      field: "capacity",
      hozAlign: "center",
      width: 200,
    },
    { title: "CEF", field: "cef", hozAlign: "center", width: 150 },
    {
      title: "Noise Level (dB)",
      field: "noise",
      hozAlign: "center",
      width: 175,
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
            &nbsp;Combined Energy Factor (CEF): {cef}
          </label>
          <input
            type="range"
            id="cef-slider"
            name="cef"
            min="3"
            max="10"
            step="0.5"
            value={cef}
            onChange={(e) => setCef(e.target.value)}
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
        <>
          <ReactTabulator
            data={results}
            columns={columns}
            options={{
              pagination: "local",
              paginationSize: 5,
            }}
          />
        </>
      )}
    </>
  );
};

export default HeatPumpDryer;
