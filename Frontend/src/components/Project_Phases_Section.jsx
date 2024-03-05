import React, { useState, useEffect } from "react";
import { Box } from "monday-ui-react-core";
import Table from "./Table.jsx";
import "monday-ui-react-core/tokens";
import axios from "axios";
import "../styling/project_phases_section.css";

let operational_column = ["Escalation Level", "Name", "Role"];
let operational_rows = [
  { level: "Level-1", name: "Ajay", designation: "project manager" },
  { level: "Level-1", name: "Ajay", designation: "project manager" },
  { level: "Level-1", name: "Ajay", designation: "project manager" },
];
const Project_Phases_Section = () => {
  const [phaseHistory, setPhaseHistory] = useState([{}]);
  const [changedTableRows, setChangedTableRows] = useState([]);
  const [showSaveButton, setShowSaveButton] = useState(false);

  const handleSubmit = async () => {
    try {
      console.log(changedTableRows);
      const response = await axios.post(
        "http://localhost:8000/project/phases",
        [...changedTableRows]
      );
      console.log(response);
      setShowSaveButton(false);
      setChangedTableRows([]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/project/phases");
      const { data } = await response.json();
      setPhaseHistory(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  let column_type = [
    {
      key: "date_column",
      type: "date",
      value: "12-24-2024",
    },
    {
      key: "dropdown_column",
      type: "dropdown",
      options: ["option 1", "option 2"],
    },
  ];

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
        {console.log("phase", phaseHistory)}
        <div className="table-container">
          {phaseHistory.length > 0 ? (
            <Table
              setShowSaveButton={setShowSaveButton}
              columnType={[
                {
                  key: "start_date",
                  type: "date",
                },
                {
                  key: "completion_date",
                  type: "date",
                },
                {
                  key: "approval_date",
                  type: "date",
                },
                {
                  key: "revised_completion_date",
                  type: "date",
                },
                {
                  key: "status",
                  type: "dropdown",
                  options: ["Delayed", "On-Time", "Pending", "Signed-Off"],
                },
              ]}
              data={phaseHistory}
              invalidColumns={["project_id", "_id", "__v"]}
              setChangedTableRows={setChangedTableRows}
            />
          ) : (
            //""
            ""
          )}
        </div>
      </Box>
    </div>
  );
};

export default Project_Phases_Section;
