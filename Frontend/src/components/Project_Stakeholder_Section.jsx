import React, { useState, useEffect } from "react";
import { Box } from "monday-ui-react-core";
import "monday-ui-react-core/tokens";
import Table from "./Table";
import axios from 'axios'

let operational_column = ["Escalation Level", "Name", "Role"];
let operational_rows = [
  { level: "Level-1", name: "Ajay", designation: "project manager" },
  { level: "Level-1", name: "Ajay", designation: "project manager" },
  { level: "Level-1", name: "Ajay", designation: "project manager" },
];
const Project_Stakeholder_Section = () => {
  const [stakeholders, setStakeholders] = useState([]);
  const [changedTableRows, setChangedtableRows] = useState([]);

  const handleSubmit = async () => {
    try {
      console.log(changedTableRows);
      const response = await axios.post(
        "http://localhost:8000/project/stakeholders",
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
        "http://localhost:8000/project/stakeholders"
      );
      const { data } = await response.json();
      console.log(data);
      setStakeholders(data);
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
        {stakeholders.length > 0 && (
          <Table
          changedTableRows={changedTableRows}
            data={stakeholders}
            invalidColumns={["project_id"]}
            columnType={[]}
          />
        )}
      </Box>
    </div>
  );
};

export default Project_Stakeholder_Section;
