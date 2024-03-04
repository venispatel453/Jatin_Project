import React, { useState, useEffect } from "react";
import { Box } from "monday-ui-react-core";
import "monday-ui-react-core/tokens";
import Table from "./Table";
import axios from "axios";
import '../styling/project_sprint_details_section.css'

let operational_column = ["Escalation Level", "Name", "Role"];
let operational_rows = [
  { level: "Level-1", name: "Ajay", designation: "project manager" },
  { level: "Level-1", name: "Ajay", designation: "project manager" },
  { level: "Level-1", name: "Ajay", designation: "project manager" },
];
const Project_Sprint_Details_Section = () => {
  const [sprintDetails, setSprintDetails] = useState([]);
  const [changedTableRows, setChangedtableRows] = useState([]);
  const [showSaveButton, setShowSaveButton] = useState(false);

  const handleSubmit = async () => {
    try {
      console.log(changedTableRows);
      const response = await axios.post(
        "http://localhost:8000/project/sprint_details",
        [...changedTableRows]
      );
      console.log(response);
      setShowSaveButton(false);
      setChangedtableRows([]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/project/sprint_details"
      );
      const { data } = await response.json();
      console.log(data);
      setSprintDetails(data);
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
          <button onClick={handleSubmit} className="save-button">Save</button>
        </div>
      )}
      <Box className="escalation-matrix-table-container">
        {sprintDetails.length > 0 && (
          <Table
            setShowSaveButton={setShowSaveButton}
            changedTableRows={changedTableRows}
            data={sprintDetails}
            invalidColumns={["project_id","_id","__v"]}
            columnType={[
              { key: "start_date", type: "date" },
              { key: "end_date", type: "date" },
              {
                key: "status",
                type: "dropdown",
                options: ["Delayed", "On-Time", "Pending", "Signed-Off"],
              },
            ]}
          />
        )}
      </Box>
    </div>
  );
};

export default Project_Sprint_Details_Section;
