import InfoSquare from "../InfoSquare";
// import styles from "../ApplianceLookup.module.scss";
import styles from "./sharedForms.module.scss";
import { useState, useMemo, useEffect } from "react";
import TableContainer from "../TableContainer";
import { ReactTabulator, ColumnDefinition } from "react-tabulator";

export function getUniqueStrings(values: string[]): string[] {
  return values
    .filter((val, index, self) => self.indexOf(val) === index)
    .sort((a, b) => a.localeCompare(b));
}

export function getUniqueNumbers(values: number[]): number[] {
  return values
    .filter((val, index, self) => self.indexOf(val) === index)
    .sort((a, b) => a - b);
}

export function link(cell: any, formatterParams: any) {
  var url = cell.getValue();
  return `<a href='${url}' target='_blank'>${url}</a>`;
}

const HeatPumpWaterHeaterForm = () => {
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  //default values
  // const [tankCapacityGallons, setTankCapacityGallons] = useState("30");
  // const [uniformEnergyFactor, setUniformEnergyFactor] = useState("0.9");
  // const [firstHourRating, setFirstHourRating] = useState("40");

  const [unit, setUnit] = useState("metric");

  const fetchData = async () => {
    const apiUrl = `https://electric-machines-h6x1.vercel.app/api/v1/appliance/appliance?applianceType=hpwh&unit=${unit}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    // console.log(apiUrl);
    setResults(data);
  };

  useEffect(() => {
    fetchData();
  }, [unit]); // runs in the beginning, and each time {unit} changes

  // sample API call:
  // https://electric-machines-h6x1.vercel.app/api/v1/appliance/appliance?applianceType=hpwh&tankCapacityMin=40&tankCapacityMax=70&uniformEnergyFactor=2.5&firstHourRating=60

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

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const apiUrl = `https://electric-machines-h6x1.vercel.app/api/v1/appliance/appliance?applianceType=hpwh&tankCapacityMin=${tankCapacityGallons}&tankCapacityMax=${
  //     tankCapacityGallons + 10
  //   }&uniformEnergyFactor=${uniformEnergyFactor}&firstHourRating=${firstHourRating}`;
  //   // console.log(apiUrl);
  //   const response = await fetch(apiUrl);
  //   const data = await response.json();
  //   // console.log(data);
  //   setResults(data);
  //   setShowResults(true);
  // };

  const metricFields: ColumnDefinition[] = [
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
      title: "Weight (kg)",
      field: "weightInKg",
      hozAlign: "center",
      minWidth: 140,
    },
  ];

  const imperialFields: ColumnDefinition[] = [
    {
      title: "Width (in)",
      field: "widthInInches",
      hozAlign: "center",
      minWidth: 150,
    },
    {
      title: "Height (in)",
      field: "heightInInches",
      hozAlign: "center",
      minWidth: 150,
    },
    {
      title: "Length (in)",
      field: "lengthInInches",
      hozAlign: "center",
      minWidth: 150,
    },
    {
      title: "Weight (lb)",
      field: "weightInPounds",
      hozAlign: "center",
      minWidth: 140,
    },
  ];

  // const columns: ColumnDefinition[] = [

  const columns: ColumnDefinition[] = [
    // ...metricFields,
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
      headerFilterPlaceholder: "Filter: Select multiple",
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
        multiselect: true,
      },
      headerFilterPlaceholder: "Filter: Select multiple",
    },
    {
      title: "Capacity (gallons)",
      field: "tankCapacityGallons",
      hozAlign: "center",
      minWidth: 200,
      headerFilter: "select",
      headerFilterFunc: "in",
      headerFilterParams: {
        values: getUniqueNumbers(
          results.map((appliance) => appliance.tankCapacityGallons)
        ),
        sortValuesList: "asc",
        multiselect: true,
      },
      headerFilterPlaceholder: "Filter: Select multiple",
    },

    {
      title: "UEF",
      field: "uniformEnergyFactor",
      hozAlign: "center",
      minWidth: 150,
      headerFilter: "input",
      headerFilterFunc: ">=",
      headerFilterPlaceholder: "Set minimum value",
    },
    {
      title: "FHR",
      field: "firstHourRating",
      hozAlign: "center",
      minWidth: 150,
      headerFilter: "input",
      headerFilterFunc: ">=",
      headerFilterPlaceholder: "Set minimum value",
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
        multiselect: true,
      },
      headerFilterPlaceholder: "Filter: Select multiple",
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
        multiselect: true,
      },
      headerFilterPlaceholder: "Filter: Select multiple",
    },
    ...(unit === "imperial" ? imperialFields : metricFields),
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
      <br />
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
                <b>Capacity </b>(gallons): Choose based upon your household's
                hot water usage. 1-2 people: 30-40 gallons, 3-4 people: 50-60
                gallons, 5-6 people: 65-80 gallons, 7+ people: 80+ gallons.
              </li>
              <li>
                <b>UEF (Uniform Energy Factor)</b>: Measures overall energy
                efficiency, influencing long-term energy costs.
              </li>
              <li>
                <b>FHR (First Hour Rating)</b>: Measures overall energy
                efficiency, influencing long-term energy costs.
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
        </div>
      </div>

      <div className={styles.resultTable}>
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
      </div>
    </>
  );
};

export default HeatPumpWaterHeaterForm;
