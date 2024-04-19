import styles from "./sharedForms.module.scss";
import { useState, useMemo, useEffect } from "react";
import "./tabulator-modern-custom.css";
// import "react-tabulator/lib/styles.css";
import { ReactTabulator, ColumnDefinition } from "react-tabulator";
import {
  getUniqueStrings,
  getUniqueNumbers,
  link,
  formatNumber,
} from "./HeatPumpWaterHeaterForm";

const HeatPumpHVAC = () => {
  const [results, setResults] = useState<any[]>([]);
  const [unit, setUnit] = useState("imperial");

  const fetchData = async () => {
    const unitParams =
      unit === "metric"
        ? `weightUnit=kg&dimensionUnit=cm`
        : `weightUnit=lb&dimensionUnit=in`;

    const apiUrl = `https://electric-machines-h6x1.vercel.app/api/v1/appliance/appliance?applianceType=hphvac&${unitParams}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    //formatting data for tabulator use
    const tabulatorData = data.map((appliance: any) => {
      const { weight, dimensions, ...restOfApplianceData } = appliance;
      return {
        ...appliance,
        weightValue: formatNumber(weight.value),
        widthValue: formatNumber(dimensions.width),
        heightValue: formatNumber(dimensions.height),
        lengthValue: formatNumber(dimensions.length),
      };
    });
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

export default HeatPumpHVAC;
