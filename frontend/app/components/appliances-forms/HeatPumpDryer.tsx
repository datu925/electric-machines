import InfoSquare from "../InfoSquare";
import styles from "./sharedForms.module.scss";
import { useState, useMemo, useEffect } from "react";
import "./tabulator-modern-custom.css";
// import "react-tabulator/lib/styles.css";
import { ReactTabulator, ColumnDefinition } from "react-tabulator";
import {
  getUniqueStrings,
  getUniqueNumbers,
  link,
} from "./HeatPumpWaterHeaterForm";

const HeatPumpDryer = () => {
  const [showResults, setShowResults] = useState(false);

  //default values
  const [combinedEnergyFactor, setCombinedEnergyFactor] = useState("1.0");
  const [capacity, setCapacity] = useState("3.0");
  const [soundLevel, setSoundLevel] = useState("67");

  //sample API call
  //electric-machines-h6x1.vercel.app/api/v1/appliance/appliance?applianceType=hpd&soundLevel=65&combinedEnergyFactor=2.0&capacityMin=4.0&capacityMax=8.0

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

  const [results, setResults] = useState<any[]>([]);

  const [unit, setUnit] = useState("imperial");

  const fetchData = async () => {
    const unitParams =
      unit === "metric"
        ? `weightUnit=kg&dimensionUnit=cm`
        : `weightUnit=lb&dimensionUnit=in`;

    const apiUrl = `https://electric-machines-h6x1.vercel.app/api/v1/appliance/appliance?applianceType=hpd&${unitParams}`;
    console.log(apiUrl);
    const response = await fetch(apiUrl);
    const data = await response.json();

    //formatting data for tabulator use
    const tabulatorData = data.map((appliance: any) => {
      const { weight, dimensions, ...restOfApplianceData } = appliance;
      return {
        ...appliance,
        weightValue: Math.round(weight.value),
        widthValue: Math.round(dimensions.width),
        heightValue: Math.round(dimensions.height),
        lengthValue: Math.round(dimensions.length),
      };
    });

    console.log(data);
    setResults(tabulatorData);
  };

  useEffect(() => {
    fetchData();
  }, [unit]);

  const columns: ColumnDefinition[] = [
    {
      title: "Brand",
      field: "brandName",
      minWidth: 165,
      headerFilter: "select",
      headerFilterFunc: "in",
      headerFilterParams: {
        values: getUniqueStrings(
          results.map((appliance) => appliance.brandName)
        ),
        sortValuesList: "asc",
        multiselect: true,
      },
      headerFilterPlaceholder: "Filter: All",
    },
    {
      title: "Model",
      field: "modelNumber",
      hozAlign: "left",
      minWidth: 200,
      headerFilter: "select",
      headerFilterFunc: "in",
      headerFilterParams: {
        values: getUniqueStrings(
          results.map((appliance) => appliance.modelNumber)
        ),
        sortValuesList: "asc",
        multiselect: true,
      },
      headerFilterPlaceholder: "Filter: All",
    },
    {
      title: "Capacity (cu-ft)",
      field: "capacity",
      hozAlign: "center",
      minWidth: 200,
      headerFilter: "input",
      headerFilterFunc: ">=",
      headerFilterPlaceholder: "Minimum: not set",
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
      headerFilterPlaceholder: "Minimum: not set",
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
      headerFilterPlaceholder: "Maximum: not set",
      headerTooltip:
        "<60 dB: Very quiet, ideal for living areas. 60-65 dB: Noticeable, not too loud, common for dryers. >65 dB: Loud, like a vacuum, might be disruptive.",
    },
    {
      title: "Voltage",
      field: "voltage",
      hozAlign: "center",
      minWidth: 140,
      headerFilter: "select",
      headerFilterFunc: "in",
      headerFilterParams: {
        values: getUniqueNumbers(results.map((appliance) => appliance.voltage)),
        sortValuesList: "asc",
        multiselect: true,
      },
      headerFilterPlaceholder: "Filter: All",
    },
    {
      title: "Breaker Size",
      field: "electricBreakerSize",
      hozAlign: "center",
      minWidth: 150,
      headerFilter: "select",
      headerFilterFunc: "in",
      headerFilterParams: {
        values: getUniqueNumbers(
          results.map((appliance) => appliance.electricBreakerSize)
        ),
        sortValuesList: "asc",
        multiselect: true,
      },
      headerFilterPlaceholder: "Filter: All",
    },
    {
      title: `Width ${unit === "imperial" ? "(in)" : "(cm)"}`,
      field: "widthValue",
      hozAlign: "center",
      minWidth: 150,
    },
    {
      title: `Height ${unit === "imperial" ? "(in)" : "(cm)"}`,
      field: "heightValue",
      hozAlign: "center",
      minWidth: 150,
    },
    {
      title: `Length ${unit === "imperial" ? "(in)" : "(cm)"}`,
      field: "lengthValue",
      hozAlign: "center",
      minWidth: 150,
    },
    {
      title: `Weight ${unit === "imperial" ? "(lb)" : "(kg)"}`,
      field: "weightValue",
      hozAlign: "center",
      minWidth: 140,
    },
    {
      title: "URL",
      field: "sourceUrl",
      hozAlign: "center",
      minWidth: 150,
      formatter: link,
    },
  ];

  const [isToggled, setIsToggled] = useState(true);

  const toggle = () => {
    setIsToggled(!isToggled);
  };

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

      <div className={styles.tableHelpSection}>
        <div>
          <label>
            <input type="checkbox" checked={isToggled} onChange={toggle} />
            <span className="switch" />
            Show Table Column Descriptions
          </label>
        </div>
        {isToggled && (
          <div className={styles.tableHelp}>
            <ul>
              <li>
                <b>Capacity </b>(cu-ft): Capacity refers to the volume of
                clothes the dryer can hold and dry efficiently, usually measured
                in cubic feet. A larger capacity is ideal for big households or
                doing less frequent, larger loads.
              </li>
              <li>
                <b>CEF (Combined Energy Factor)</b>: A higher CEF means better
                energy efficiency, leading to lower operating costs over time.
                Consider this factor for long-term savings.
              </li>
              <li>
                <b>Sound Level</b> (dB): &lt;60 dB: Very quiet, ideal for living
                areas. 60-65 dB: Noticeable, not too loud, common for dryers.
                &gt;65 dB: Loud, like a vacuum, might be disruptive.
              </li>
            </ul>
          </div>
        )}
      </div>
      <br />

      <div className={`${styles.radioGroup} ${styles.metricSelection}`}>
        <label className={styles.labelWithInfo} htmlFor="unit">
          Unit System:
        </label>
        <div className={styles.radioOptions}>
          <label htmlFor="unitImperial">
            <input
              type="radio"
              id="unitImperial"
              name="unit"
              value="imperial"
              className={styles.radioInput}
              checked={unit === "imperial"}
              onChange={(event) => setUnit(event.target.value)}
            />
            <span className={styles.radioText}>Imperial</span>
          </label>
          <label htmlFor="unitMetric">
            <input
              type="radio"
              id="unitMetric"
              name="unit"
              value="metric"
              className={styles.radioInput}
              checked={unit === "metric"}
              onChange={(event) => setUnit(event.target.value)}
            />
            <span className={styles.radioText}>Metric</span>
          </label>
        </div>
      </div>

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
