import React, { useState, useEffect } from "react"; // Importing React and necessary hooks
import { Box } from "monday-ui-react-core"; // Importing Box component from Monday UI React Core library
import Table from "./Table.jsx"; // Importing custom Table component
import "monday-ui-react-core/tokens"; // Importing tokens for styling
import axios from "axios"; // Importing Axios for making HTTP requests
import "../styling/project_phases_section.css"; // Importing CSS styles for the component
import { toast } from "react-toastify"; // Importing toast notifications for displaying messages

// Project_Phases_Section component definition
const Project_Phases_Section = () => {
  // State variables to manage component data and behavior
  const [phaseHistory, setPhaseHistory] = useState([]); // State to manage phase history data
  const [changedTableRows, setChangedTableRows] = useState([]); // State to manage changed table rows
  const [showSaveButton, setShowSaveButton] = useState(false); // State to control the visibility of the save button

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      // Sending changed table rows to the server for saving
      const response = await axios.post(
        "http://localhost:8000/project/phases",
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

  // Function to fetch phase history data from the server
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/project/phases");
      const { data } = await response.json();
      // Setting fetched phase history data to state variable
      setPhaseHistory(data);
    } catch (error) {
      // Displaying error message using toast notification
      toast.error("Some Error");
    }
  };

  // Hook to fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures that this effect runs only once after the component mounts

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
        <div className="table-container">
          {/* Render the Table component if phase history data is available */}
          {phaseHistory.length > 0 ? (
            <Table
              sectionTab={"phases"}
              setShowSaveButton={setShowSaveButton}
              columnType={[
                // Define column types for rendering
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
              data={phaseHistory} // Pass phase history data to the Table component
              invalidColumns={["project_id", "_id", "__v"]} // Define invalid columns to exclude from rendering
              setChangedTableRows={setChangedTableRows} // Pass function to manage changed table rows
            />
          ) : (
            "" // Render nothing if phase history data is not available
          )}
        </div>
      </Box>
    </div>
  );
};

export default Project_Phases_Section; // Exporting the component
