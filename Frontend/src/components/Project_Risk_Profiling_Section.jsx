import React, { useState, useEffect } from "react"; // Importing React and necessary hooks
import { Box } from "monday-ui-react-core"; // Importing Box component from Monday UI React Core library
import "monday-ui-react-core/tokens"; // Importing tokens for styling
import Table from "./Table"; // Importing custom Table component
import axios from "axios"; // Importing Axios for making HTTP requests
import "../styling/project_risk_profiling_section.css"; // Importing CSS styles for the component
import { toast } from "react-toastify"; // Importing toast notifications for displaying messages

// Project_Risk_Profiling_Section component definition
const Project_Risk_Profiling_Section = () => {
  // State variables to manage component data and behavior
  const [riskProfiling, setRiskProfiling] = useState([]); // State to manage risk profiling data
  const [changedTableRows, setChangedTableRows] = useState([]); // State to manage changed table rows
  const [showSaveButton, setShowSaveButton] = useState(false); // State to control the visibility of the save button

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      // Sending changed table rows to the server for saving
      const response = await axios.post(
        "http://localhost:8000/project/risk_profiling",
        [...changedTableRows]
      );
      // Displaying success message using toast notification
      toast.success("Data Saved Successfully");
      setShowSaveButton(false); // Hiding the save button after successful submission
      setChangedTableRows([]); // Clearing the changed table rows
    } catch (error) {
      // Displaying error message using toast notification
      toast.error("Some Error");
    }
  };

  // Function to fetch risk profiling data from the server
  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/project/risk_profiling"
      );
      const { data } = await response.json();
      // Setting fetched risk profiling data to state variable
      setRiskProfiling(data);
    } catch (error) {
      // Displaying error message using toast notification
      toast.error("Some Error");
    }
  };

  // Hook to fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Render JSX
  return (
    <div>
      {/* Render the save button only if changes have been made */}
      {showSaveButton && (
        <div className="save-button-container">
          <button onClick={handleSubmit} className="save-button">
            Save
          </button>
        </div>
      )}
      {/* Container for the table */}
      <Box className="escalation-matrix-table-container">
        {/* Render the Table component if risk profiling data is available */}
        {riskProfiling.length > 0 && (
          <Table
            sectionTab={"risk_profilling"} // Pass section tab as prop to the Table component
            setShowSaveButton={setShowSaveButton} // Pass function to control the visibility of the save button
            data={riskProfiling} // Pass risk profiling data to the Table component
            setChangedTableRows={setChangedTableRows} // Pass function to manage changed table rows
            invalidColumns={["project_id", "_id", "__v"]} // Define invalid columns to exclude from rendering
            columnType={[
              // Define column types for rendering
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

export default Project_Risk_Profiling_Section; // Exporting the component
