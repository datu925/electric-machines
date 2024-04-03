import InfoSquare from "../InfoSquare";
// import styles from "../ApplianceLookup.module.scss";
import styles from "./sharedForms.module.scss";
import { useState, useMemo, useEffect } from "react";
import TableContainer from "../TableContainer";
import { ReactTabulator, ColumnDefinition } from "react-tabulator";

const HeatPumpWaterHeaterForm = () => {
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);

  //default values
  const [tankCapacityGallons, setTankCapacityGallons] = useState("30");
  const [uniformEnergyFactor, setUniformEnergyFactor] = useState("0.9");
  const [firstHourRating, setFirstHourRating] = useState("40");

  const fetchData = async () => {
    const apiUrl = `https://electric-machines-h6x1.vercel.app/api/v1/appliance?applianceType=hpwh&capacityMin=1&capacityMax=1000&uef=1&fhr=1`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    setResults(data);
  };

  useEffect(() => {
    fetchData();
  }, []); // runs once

  // sample API call:
  // https://electric-machines-h6x1.vercel.app/api/v1/appliance?applianceType=hpwh&tankCapacityGallons=40&uniformEnergyFactor=2.5&firstHourRating=60

  // Sample API response
  // [
  // {
  //   "brandName": "Rheem",
  //   "modelNumber": "PROPH40 T2 RH375-30",
  //   "sourceUrl": "https://files.myrheem.com/webpartnerspublic/ProductDocuments/65DF1261-86D9-4756-AAAD-F403E9FF124A.pdf",
  //   "tankCapacityGallons": 40,
  //   "weightInKg": 71.214,
  //   "widthInCm": 50,
  //   "heightInCm": 160.02,
  //   "lengthInCm": 50,
  //   "electricBreakerSize": 30,
  //   "voltage": 240,
  //   "uniformEnergyFactor": 3.83,
  //   "firstHourRating": 60
  // },
  // ];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const apiUrl = `https://electric-machines-h6x1.vercel.app/api/v1/appliance?applianceType=hpwh&capacityMin=${tankCapacityGallons}&capacityMax=${
      tankCapacityGallons + 10
    }&uef=${uniformEnergyFactor}&fhr=${firstHourRating}`;
    // console.log(apiUrl);
    const response = await fetch(apiUrl);
    const data = await response.json();
    // console.log(data);
    setResults(data);
    setShowResults(true);
  };

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
      minWidth: 165,
      headerFilter: "input",
      headerFilterPlaceholder: "Model (e.g., RH375)",
    },
    {
      title: "Capacity (gallons)",
      field: "tankCapacityGallons",
      hozAlign: "center",
      minWidth: 160,
      headerFilter: "input",
      headerFilterFunc: ">=",
      headerFilterPlaceholder: "Minimum (e.g., 40)",
      headerTooltip:
        "Choose based upon your household's hot water usage. 1-2 people: 30-40 gallons, 3-4 people: 50-60 gallons, 5-6 people: 65-80 gallons, 7+ people: 80+ gallons.",
    },

    {
      title: "UEF",
      field: "uniformEnergyFactor",
      hozAlign: "center",
      minWidth: 150,
      headerFilter: "input",
      headerFilterFunc: ">=",
      headerFilterPlaceholder: "Mininum (e.g., 3.0)",
      headerTooltip:
        "Measures overall energy efficiency, influencing long-term energy costs.",
    },
    {
      title: "FHR",
      field: "firstHourRating",
      hozAlign: "center",
      minWidth: 150,
      headerFilter: "input",
      headerFilterFunc: ">=",
      headerFilterPlaceholder: "Minimum (e.g., 40)",
      headerTooltip:
        "Estimates hot water supply in the first hour, crucial for peak demand.",
    },
    {
      title: "Weight (kg)",
      field: "weightInKg",
      hozAlign: "center",
      minWidth: 140,
    },
    {
      title: "Voltage",
      field: "voltage",
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
            <InfoSquare
              text={`Choose based upon your household's hot water usage. 1-2 people: 30-40 gallons, 3-4 people: 50-60 gallons, 5-6 people: 65-80 gallons, 7+ people: 80+ gallons. `}
            />
            &nbsp;Tank Capacity (gallons): {tankCapacityGallons}
          </label>
          <input
            type="range"
            id="capacity-slider"
            name="capacity"
            min="30"
            max="80"
            step="10"
            value={tankCapacityGallons}
            onChange={(e) => setTankCapacityGallons(e.target.value)}
            className={styles.slider}
          />
        </div>
        <div className={styles.sliderGroup}>
          <label className={styles.labelWithInfo} htmlFor="uef-slider">
            <InfoSquare text="Measures overall energy efficiency, influencing long-term energy costs." />
            &nbsp;Uniform Energy Factor (UEF): {uniformEnergyFactor}
          </label>
          <input
            type="range"
            id="uef-slider"
            name="uef"
            min="0.90"
            max="3.00"
            step="0.1"
            value={uniformEnergyFactor}
            onChange={(e) => setUniformEnergyFactor(e.target.value)}
            className={styles.slider}
          />
        </div>
        <div className={styles.sliderGroup}>
          <label className={styles.labelWithInfo} htmlFor="fhr-slider">
            <InfoSquare text="Estimates hot water supply in the first hour, crucial for peak demand." />
            &nbsp;First Hour Rating (FHR): {firstHourRating} gallons
          </label>
          <input
            type="range"
            id="fhr-slider"
            name="fhr"
            min="40"
            max="120"
            step="10"
            value={firstHourRating}
            onChange={(e) => setFirstHourRating(e.target.value)}
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
      </form> */}
      {/* {showResults && (
        <> */}
      <ReactTabulator
        data={results}
        columns={columns}
        options={{
          pagination: "local",
          paginationSize: 10,
          paginationSizeSelector: true,
          // selectable: true,
        }}
      />
      {/* </>
      )} */}
    </>
  );
};

export default HeatPumpWaterHeaterForm;
