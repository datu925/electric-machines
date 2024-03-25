import InfoSquare from "../InfoSquare";
// import styles from "../ApplianceLookup.module.scss";
import styles from "./sharedForms.module.scss";
import { useState, useMemo } from "react";
import TableContainer from "../TableContainer";
import { ReactTabulator, ColumnDefinition } from "react-tabulator";

const HeatPumpWaterHeaterForm = () => {
  const [showResults, setShowResults] = useState(false);

  //default values
  const [capacity, setCapacity] = useState("40");
  const [uef, setUef] = useState("2.0");
  const [fhr, setFhr] = useState("80");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowResults(true);
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
  const columns: ColumnDefinition[] = [
    { title: "Brand", field: "brand" },
    { title: "Model", field: "model", hozAlign: "left" },
    {
      title: "Capacity (gallons)",
      field: "capacity",
      hozAlign: "center",
      width: 150,
    },
    { title: "UEF", field: "uef", hozAlign: "center", width: 150 },
    { title: "FHR", field: "fhr", hozAlign: "center", width: 150 },
  ];

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.sliderGroup}>
          <label className={styles.labelWithInfo} htmlFor="capacity-slider">
            <InfoSquare
              text={`Choose based upon your household's hot water usage. 1-2 people: 30-40 gallons, 3-4 people: 50-60 gallons, 5-6 people: 65-80 gallons, 7+ people: 80+ gallons. `}
            />
            &nbsp;Tank Capacity (gallons): {capacity}
          </label>
          <input
            type="range"
            id="capacity-slider"
            name="capacity"
            min="30"
            max="80"
            step="10"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className={styles.slider}
          />
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
      {showResults && (
        <>
          <ReactTabulator
            data={results}
            columns={columns}
            options={{
              pagination: "local",
              paginationSize: 5,
              // selectable: true,
            }}
          />
        </>
      )}
    </>
  );
};

export default HeatPumpWaterHeaterForm;
