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
  const [tankCapacityGallons, setTankCapacityGallons] = useState("30");
  const [uniformEnergyFactor, setUniformEnergyFactor] = useState("0.9");
  const [firstHourRating, setFirstHourRating] = useState("40");

  const fetchData = async () => {
    const apiUrl = `https://electric-machines-h6x1.vercel.app/api/v1/appliance/appliance?applianceType=hpwh&capacityMin=1&capacityMax=1000&uef=1&fhr=1`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    setResults(data);
  };

  useEffect(() => {
    fetchData();
  }, []); // runs once

  // sample API call:
  // https://electric-machines-h6x1.vercel.app/api/v1/appliance/appliance?applianceType=hpwh&tankCapacityGallons=40&uniformEnergyFactor=2.5&firstHourRating=60

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
    const apiUrl = `https://electric-machines-h6x1.vercel.app/api/v1/appliance/appliance?applianceType=hpwh&capacityMin=${tankCapacityGallons}&capacityMax=${
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
