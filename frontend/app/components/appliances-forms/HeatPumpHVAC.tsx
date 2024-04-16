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

const HeatPumpHVAC = () => {
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
  };
};
