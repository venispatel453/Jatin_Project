import React, { useState, useEffect } from "react";
import { Box } from "monday-ui-react-core";
import "monday-ui-react-core/tokens";
import Table from "./Table";
import axios from "axios";
import '../styling/project_stakeholder_section.css'
import {toast} from 'react-toastify'

const Project_Stakeholder_Section = () => {
  const [stakeholders, setStakeholders] = useState([]);
  const [changedTableRows, setChangedTableRows] = useState([]);
  const [showSaveButton, setShowSaveButton] = useState(false);

  const handleSubmit = async () => {
    try {
      console.log(changedTableRows);
      const response = await axios.post(
        "http://localhost:8000/project/stakeholders",
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
        "http://localhost:8000/project/stakeholders"
      );
      const { data } = await response.json();
      setStakeholders(data);
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
        {stakeholders.length > 0 && (
          <Table
          sectionTab={"stakeholder"}
            setShowSaveButton={setShowSaveButton}
            setChangedTableRows={setChangedTableRows}
            data={stakeholders}
            invalidColumns={["project_id", "_id", "__v"]}
            columnType={[]}
          />
        )}
      </Box>
    </div>
  );
};

export default Project_Stakeholder_Section;
