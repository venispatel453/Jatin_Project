import React, { useState, useEffect } from "react";
import { Box } from "monday-ui-react-core";
import Table from "./Table.jsx";
import "monday-ui-react-core/tokens";
import axios from "axios";
import "../styling/project_phases_section.css";
import { toast } from "react-toastify";

const Project_Phases_Section = () => {
  const [phaseHistory, setPhaseHistory] = useState([]);
  const [changedTableRows, setChangedTableRows] = useState([]);
  const [showSaveButton, setShowSaveButton] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/project/phases",
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
      const response = await fetch("http://localhost:8000/project/phases");
      const { data } = await response.json();
      setPhaseHistory(data);
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
        <div className="table-container">
          {phaseHistory.length > 0 ? (
            <Table
              sectionTab={"phases"}
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
            ""
          )}
        </div>
      </Box>
    </div>
  );
};

export default Project_Phases_Section;
