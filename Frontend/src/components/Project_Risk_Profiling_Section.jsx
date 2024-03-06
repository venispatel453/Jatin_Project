import React, { useState, useEffect } from "react";
import { Box } from "monday-ui-react-core";
import "monday-ui-react-core/tokens";
import Table from "./Table";
import axios from "axios";
import '../styling/project_risk_profiling_section.css'
import {toast} from 'react-toastify'

const Project_Risk_Profiling_Section = () => {
  const [riskProfiling, setRiskProfiling] = useState([]);
  const [changedTableRows, setChangedTableRows] = useState([]);
  const [showSaveButton, setShowSaveButton] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/project/risk_profiling",
        [...changedTableRows]
      );
      toast.success("Data Saved Successfully");
      setShowSaveButton(false);
      setChangedTableRows([]);
    } catch (error) {
      toast.error("Some Error");
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/project/risk_profiling"
      );
      const { data } = await response.json();
      setRiskProfiling(data);
    } catch (error) {
      toast.error("Some Error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {showSaveButton && (
        <div className="save-button-container">
          <button onClick={handleSubmit} className="save-button">
            Save
          </button>
        </div>
      )}
      <Box className="escalation-matrix-table-container">
        {riskProfiling.length > 0 && (
          <Table
          sectionTab={"risk_profilling"}
            setShowSaveButton={setShowSaveButton}
            data={riskProfiling}
            setChangedTableRows={setChangedTableRows}
            invalidColumns={["project_id", "_id", "__v"]}
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
