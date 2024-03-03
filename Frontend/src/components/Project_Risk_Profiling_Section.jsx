import React, { useState, useEffect } from "react";
import { Box } from "monday-ui-react-core";
import "monday-ui-react-core/tokens";
import Table from "./Table";
import axios from "axios";

let operational_column = ["Escalation Level", "Name", "Role"];
let operational_rows = [
  { level: "Level-1", name: "Ajay", designation: "project manager" },
  { level: "Level-1", name: "Ajay", designation: "project manager" },
  { level: "Level-1", name: "Ajay", designation: "project manager" },
];
const Project_Risk_Profiling_Section = () => {
  const [riskProfiling, setRiskProfiling] = useState([]);
  const [changedTableRows, setChangedtableRows] = useState([]);

  const handleSubmit = async () => {
    try {
      console.log(changedTableRows);
      const response = await axios.post(
        "http://localhost:8000/project/risk_profiling",
        [...changedTableRows]
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/project/risk_profiling"
      );
      const { data } = await response.json();
      console.log(data);
      setRiskProfiling(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="save-btn">
        <button onClick={handleSubmit}>save</button>
      </div>
      <Box className="escalation-matrix-table-container">
        {riskProfiling.length > 0 && (
          <Table
            data={riskProfiling}
            changedTableRows={changedTableRows}
            invalidColumns={["project_id"]}
            columnType={[
              {
                key: "risk_type",
                type: "dropdown",
                options: [
                  "Financial",
                  "Operational",
                  "Technical",
                  "HR",
                  "External",
                ],
              },
              {
                key: "severity",
                type: "dropdown",
                options: ["High", "Medium", "Low"],
              },
              {
                key: "impact",
                type: "dropdown",
                options: ["High", "Medium", "Low"],
              },
              {
                key: "closure_date",
                type: "date",
              },
            ]}
          />
        )}
      </Box>
    </div>
  );
};

export default Project_Risk_Profiling_Section;
