import styles from "./sharedForms.module.scss";
import "./tabulator-modern-custom.css";
import { useState, useEffect } from "react";
import { ReactTabulator, ColumnDefinition } from "react-tabulator";
import {
  getUniqueNumbers,
  getUniqueStrings,
  formatNumber,
  link,
} from "./helper";

const HeatPumpHVAC = () => {
  const [results, setResults] = useState<any[]>([]);
  const [unit, setUnit] = useState("imperial");
  const [fetchError, setFetchError] = useState(false);

  const fetchData = async () => {
    const unitParams =
      unit === "metric"
        ? `weightUnit=kg&dimensionUnit=cm`
        : `weightUnit=lb&dimensionUnit=in`;

    const apiUrl = `https://electric-machines-h6x1.vercel.app/api/v1/appliance/appliance?applianceType=hphvac&${unitParams}`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error!`);
      }
      const data = await response.json();
      if (data.length == 0) {
        setFetchError(true);
      }
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
    } catch {
      setFetchError(true);
    }
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
      {!fetchError && (
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
          <div className={styles.mobileHint}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#888"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 9h.01" />
              <path d="M11 12h1v4h1" />
              <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z" />
            </svg>
            <p>
              To optimize readability, we recommend viewing the app on a larger
              screen.
            </p>
          </div>
          <div className={styles.resultTable}>
            <ReactTabulator
              data={results}
              columns={columns}
              options={{
                pagination: "local",
                paginationSize: 20,
                paginationSizeSelector: true,
                movableColumns: true,
                // selectable: true,
              }}
            />
          </div>
        </>
      )}
      {fetchError && (
        <p className={styles.fetchError}>
          Error fetching data. Please try again later or{" "}
          <a
            href="https://github.com/datu925/electric-machines"
            target="_blank"
          >
            send us a message
          </a>
          .
        </p>
      )}
    </>
  );
};

export default HeatPumpHVAC;
