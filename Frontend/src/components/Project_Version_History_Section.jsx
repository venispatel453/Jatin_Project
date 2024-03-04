import React, { useState, useEffect } from "react";
import { Box } from "monday-ui-react-core";
import "monday-ui-react-core/tokens";
import Table from "./Table";
import axios from "axios";
import '../styling/project_version_history_section.css'

let operational_column = ["Escalation Level", "Name", "Role"];
let operational_rows = [
  { level: "Level-1", name: "Ajay", designation: "project manager" },
  { level: "Level-1", name: "Ajay", designation: "project manager" },
  { level: "Level-1", name: "Ajay", designation: "project manager" },
];
const Project_Version_History_Section = () => {
  const [versionHistory, setVersionHistory] = useState([]);
  const [changedTableRows, setChangedtableRows] = useState([]);
  const [showSaveButton, setShowSaveButton] = useState(false);

  const handleSubmit = async () => {
    try {
      console.log(changedTableRows);
      const response = await axios.post(
        "http://localhost:8000/project/version_history",
        [...changedTableRows]
      );
      setShowSaveButton(false);
      setChangedtableRows([]);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/project/version_history"
      );
      const { data } = await response.json();
      console.log(data);
      setVersionHistory(data);
    } catch (error) {
      console.log(error);
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
            save
          </button>
        </div>
      )}
      <Box className="escalation-matrix-table-container">
        {versionHistory.length > 0 && (
          <Table
            setShowSaveButton={setShowSaveButton}
            changedTableRows={changedTableRows}
            data={versionHistory}
            invalidColumns={["project_id", "_id", "__v"]}
            columnType={[
              {
                key: "revision_date",
                type: "date",
              },
              {
                key: "approval_date",
                type: "date",
              },
            ]}
          />
        )}
      </Box>
    </div>
  );
};

export default Project_Version_History_Section;
