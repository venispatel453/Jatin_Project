import React, { useState, useEffect } from "react";
import { Box } from "monday-ui-react-core";
import "monday-ui-react-core/tokens";
import Table from "./Table";
import axios from "axios";
import "../styling/project_audit_history_section.css";
import { toast } from "react-toastify";

const Project_Audit_History_Section = () => {
  const [auditHistory, setAuditHistory] = useState([]);
  const [changedTableRows, setChangedTableRows] = useState([]);
  const [showSaveButton, setShowSaveButton] = useState(false);

  const handleSubmit = async () => {
    try {
      console.log(changedTableRows);
      const response = await axios.post(
        "http://localhost:8000/project/audit_history",
        [...changedTableRows]
      );
      toast.success("Data Saved Successfully");
      setShowSaveButton(false);
      setChangedTableRows([]);

      const sendmail_response = await axios.post(
        "http://localhost:8000/project/sendEmail",
        [...changedTableRows]
      );
    } catch (error) {
      toast.error("Some Error");
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/project/audit_history"
      );
      const { data } = await response.json();
      setAuditHistory(data);
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
        {auditHistory.length > 0 && (
          <Table
            sectionTab={"audit_history"}
            setShowSaveButton={setShowSaveButton}
            data={auditHistory}
            columnType={[{ key: "date_of_audit", type: "date" }]}
            invalidColumns={["project_id", "_id", "__v"]}
            setChangedTableRows={setChangedTableRows}
          />
        )}
      </Box>
    </div>
  );
};

export default Project_Audit_History_Section;
