import InfoSquare from "../InfoSquare";
// import styles from "../ApplianceLookup.module.scss";
import styles from "./sharedForms.module.scss";
import { useState, useMemo } from "react";
import TableContainer from "../TableContainer";

const HeatPumpDryer = () => {
  const [showResults, setShowResults] = useState(false);

  //default values
  const [cef, setCef] = useState("7.0");
  const [capacity, setCapacity] = useState("6.0");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowResults(true);
  };

  const [results, setResults] = useState([
    {
      brand: "Brand1",
      id: 1,
      model: "XJ-75F",
      capacity: 7,
      noise: "High",
      cef: 5,
    },
    {
      brand: "Brand2",
      id: 2,
      model: "QW-90G",
      capacity: 7.5,
      noise: "High",
      cef: 6,
    },
    {
      brand: "Brand3",
      id: 3,
      model: "LM-40K",
      capacity: 8,
      noise: "High",
      cef: 6.5,
    },
    {
      brand: "Brand4",
      id: 4,
      model: "AB-65R",
      capacity: 9,
      noise: "High",
      cef: 8,
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
        Header: "Noise Level",
        accessor: "noise",
      },
      {
        Header: "CEF",
        accessor: "cef",
      },
      {
        Header: "Capacity (cu-ft)",
        accessor: "capacity",
      },
    ],
    []
  );

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.radioGroup}>
          <label className={styles.labelWithInfo} htmlFor="household-size">
            <InfoSquare text="High noise levels are louder and might be more noticeable, but these models can be more cost-effective and are best placed in separate utility areas, away from living spaces." />
            <span>&nbsp;Noise Level </span>
          </label>

          <div>
            <div className={styles.radioOptions}>
              <label htmlFor="noiseLow">
                <input
                  type="radio"
                  id="noiseLow"
                  name="noise-level"
                  value="Low"
                  className={styles.radioInput}
                />
                <span className={styles.radioText}>Low</span>
              </label>

              <label htmlFor="noiseMedium">
                <input
                  type="radio"
                  id="noiseMedium"
                  name="noise-level"
                  value="Medium"
                  className={styles.radioInput}
                />
                <span className={styles.radioText}>Medium</span>
              </label>

              <label htmlFor="noiseHigh">
                <input
                  type="radio"
                  id="noiseHigh"
                  name="noise-level"
                  value="High"
                  className={styles.radioInput}
                />
                <span className={styles.radioText}>High</span>
              </label>
            </div>
          </div>
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
        <div>
          <input
            className={styles.submitButton}
            type="submit"
            value="Start Lookup"
          />
        </div>
      </form>
      {showResults && (
        <>
          {/* <div>{JSON.stringify(results)}</div>*/}
          <TableContainer columns={columns} data={results} />
        </>
      )}
    </>
  );
};

export default HeatPumpDryer;
