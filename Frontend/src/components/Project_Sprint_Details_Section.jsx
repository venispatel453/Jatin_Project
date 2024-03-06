import React, { useState, useEffect } from "react";
import { Box } from "monday-ui-react-core";
import "monday-ui-react-core/tokens";
import Table from "./Table";
import axios from "axios";
import {toast} from 'react-toastify'
import '../styling/project_sprint_details_section.css'

const Project_Sprint_Details_Section = () => {
  const [sprintDetails, setSprintDetails] = useState([]);
  const [changedTableRows, setChangedTableRows] = useState([]);
  const [showSaveButton, setShowSaveButton] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/project/sprint_details",
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
        "http://localhost:8000/project/sprint_details"
      );
      const { data } = await response.json();
      setSprintDetails(data);
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
          <button onClick={handleSubmit} className="save-button">Save</button>
        </div>
      )}
      <Box className="escalation-matrix-table-container">
        {sprintDetails.length > 0 && (
          <Table
          sectionTab={"sprint_details"}
            setShowSaveButton={setShowSaveButton}
            setChangedTableRows={setChangedTableRows}
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
