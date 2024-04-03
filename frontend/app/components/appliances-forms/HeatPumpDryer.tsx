import InfoSquare from "../InfoSquare";
import styles from "./sharedForms.module.scss";
import { useState, useMemo, useEffect } from "react";
import "./tabulator-modern-custom.css";
// import "react-tabulator/lib/styles.css";
import { ReactTabulator, ColumnDefinition } from "react-tabulator";

const HeatPumpDryer = () => {
  const [showResults, setShowResults] = useState(false);

  //default values
  const [combinedEnergyFactor, setCombinedEnergyFactor] = useState("1.0");
  const [capacity, setCapacity] = useState("3.0");
  const [soundLevel, setSoundLevel] = useState("67");

  //sample API call
  //electric-machines-h6x1.vercel.app/api/v1/appliance?applianceType=hpd&soundLevel=62&combinedEnergyFactor=7.0&capacity=6.0

  //sample API results
  // {
  //   "brandName": "General Electric",
  //   "modelNumber": "PFD87ESSVWW/ES(P/M)VRS 240V",
  //   "sourceUrl": "https://products-salsify.geappliances.com/image/upload/s--XdcWb9Qq--/tjtu3zcktpaufsk10vrm.pdf?_ga=2.104748992.1570831524.1711587971-928897490.1711587971",
  //   "weightInKg": 50,
  //   "widthInCm": 50,
  //   "heightInCm": 160.02,
  //   "lengthInCm": 50,
  //   "electricBreakerSize": 30,
  //   "voltage": 240,
  //   "soundLevelMax": 63,
  //   "combinedEnergyFactor": 2,
  //   "capacity": 7.8
  // },

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   // const apiUrl = `https://electric-machines-h6x1.vercel.app/api/v1/appliance?applianceType=hpd&soundLevel=${soundLevel}&cef=${combinedEnergyFactor}&capacityMin=${capacity}&capacityMax=100`;
  //   const apiUrl = `https://electric-machines-h6x1.vercel.app/api/v1/appliance?applianceType=hpd&soundLevel=100&cef=1.0&capacityMin=1.0&capacityMax=100`;
  //   console.log(apiUrl);
  //   const response = await fetch(apiUrl);
  //   const data = await response.json();
  //   // console.log(data);
  //   setResults(data);
  //   setShowResults(true);
  // };
  const [results, setResults] = useState([]);

  const fetchData = async () => {
    const apiUrl = `https://electric-machines-h6x1.vercel.app/api/v1/appliance?applianceType=hpd&soundLevel=100&cef=1.0&capacityMin=1.0&capacityMax=100`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    setResults(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns: ColumnDefinition[] = [
    {
      title: "Brand",
      field: "brandName",
      minWidth: 165,
      headerFilter: "input",
      headerFilterPlaceholder: "Brand (e.g., Rheem)",
    },
    {
      title: "Model",
      field: "modelNumber",
      hozAlign: "left",
      minWidth: 200,
      headerFilter: "input",
      headerFilterPlaceholder: "Model (e.g., RH375)",
    },
    {
      title: "Capacity (cu-ft)",
      field: "capacity",
      hozAlign: "center",
      minWidth: 160,
      headerFilter: "input",
      headerFilterFunc: ">=",
      headerFilterPlaceholder: "Minimum (e.g., 3.0)",
      headerTooltip:
        "Capacity refers to the volume of clothes the dryer can hold and dry efficiently, usually measured in cubic feet. A larger capacity is ideal for big households or doing less frequent, larger loads.",
    },
    {
      title: "CEF",
      field: "combinedEnergyFactor",
      hozAlign: "center",
      minWidth: 150,
      headerFilter: "input",
      headerFilterFunc: ">=",
      headerFilterPlaceholder: "Mininum (e.g., 1.0)",
      headerTooltip:
        "A higher CEF means better energy efficiency, leading to lower operating costs over time. Consider this factor for long-term savings.",
    },
    {
      title: "Sound Level (dB)",
      field: "soundLevelMax",
      hozAlign: "center",
      minWidth: 150,
      headerFilter: "input",
      headerFilterFunc: "<=",
      headerFilterPlaceholder: "Maximum (e.g., 65)",
      headerTooltip:
        "<60 dB: Very quiet, ideal for living areas. 60-65 dB: Noticeable, not too loud, common for dryers. >65 dB: Loud, like a vacuum, might be disruptive.",
    },
    {
      title: "Voltage",
      field: "voltage",
      hozAlign: "center",
      minWidth: 140,
    },
    {
      title: "Weight (kg)",
      field: "weightInKg",
      hozAlign: "center",
      minWidth: 140,
    },

    {
      title: "Width (cm)",
      field: "widthInCm",
      hozAlign: "center",
      minWidth: 150,
    },
    {
      title: "Height (cm)",
      field: "heightInCm",
      hozAlign: "center",
      minWidth: 150,
    },
    {
      title: "Length (cm)",
      field: "lengthInCm",
      hozAlign: "center",
      minWidth: 150,
    },
    {
      title: "Breaker Size",
      field: "electricBreakerSize",
      hozAlign: "center",
      minWidth: 150,
    },
  ];

  return (
    <>
      {/* <form className={styles.form} onSubmit={handleSubmit}>
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
            min="1.0"
            max="4.0"
            step="0.1"
            value={combinedEnergyFactor}
            onChange={(e) => setCombinedEnergyFactor(e.target.value)}
            className={styles.slider}
          />
        </div>
        <div className={styles.radioGroup}>
          <label className={styles.labelWithInfo} htmlFor="sound-level">
            <InfoSquare text="High sound levels are louder and might be more noticeable, but these models can be more cost-effective and are best placed in separate utility areas, away from living spaces." />
            <span>&nbsp;Sound Level </span>
          </label>

          <div>
            <div className={styles.radioOptions}>
              <label htmlFor="soundExtraSilent">
                <input
                  type="radio"
                  id="soundExtraSilent"
                  name="sound-level"
                  value="62"
                  className={styles.radioInput}
                  checked={soundLevel === "62"}
                  onChange={(event) => setSoundLevel(event.target.value)}
                />
                <span className={styles.radioText}>
                  Extra Silent(&lt;62 dB)
                </span>
              </label>
              <label htmlFor="soundSilent">
                <input
                  type="radio"
                  id="soundSilent"
                  name="sound-level"
                  value="64"
                  className={styles.radioInput}
                  checked={soundLevel === "64"}
                  onChange={(event) => setSoundLevel(event.target.value)}
                />
                <span className={styles.radioText}>Silent(&lt;64dB)</span>
              </label>

              <label htmlFor="soundNormal">
                <input
                  type="radio"
                  id="soundNormal"
                  name="sound-level"
                  value="66"
                  className={styles.radioInput}
                  checked={soundLevel === "66"}
                  onChange={(event) => setSoundLevel(event.target.value)}
                />
                <span className={styles.radioText}>Normal(&lt;66dB)</span>
              </label>

              <label htmlFor="soundLoud">
                <input
                  type="radio"
                  id="soundLoud"
                  name="sound-level"
                  value="67"
                  className={styles.radioInput}
                  checked={soundLevel === "67"}
                  onChange={(event) => setSoundLevel(event.target.value)}
                />
                <span className={styles.radioText}>Loud(&lt;67dB)</span>
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
      layout={"fitData"} */}

      {/* {showResults && ( */}
      <div className={styles.resultTable}>
        <ReactTabulator
          data={results}
          columns={columns}
          options={{
            pagination: "local",
            paginationSize: 8,
          }}
        />
      </div>
      {/* )} */}
    </>
  );
};

export default HeatPumpDryer;
