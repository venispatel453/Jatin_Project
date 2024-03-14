import React, { useState, useEffect } from "react"; // Importing React and necessary hooks
import { Box } from "monday-ui-react-core"; // Importing Box component from Monday UI React Core library
import "monday-ui-react-core/tokens"; // Importing tokens for styling
import Table from "./Table"; // Importing custom Table component
import axios from "axios"; // Importing Axios for making HTTP requests
import { toast } from "react-toastify"; // Importing toast notifications for displaying messages
import "../styling/project_sprint_details_section.css"; // Importing CSS styles for the component

// Project_Sprint_Details_Section component definition
const Project_Sprint_Details_Section = () => {
  // State variables to manage component data and behavior
  const [sprintDetails, setSprintDetails] = useState([]); // State to manage sprint details
  const [changedTableRows, setChangedTableRows] = useState([]); // State to track changed table rows
  const [showSaveButton, setShowSaveButton] = useState(false); // State to control visibility of save button

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const PATH_NAME = new URL(window.location.href).pathname;

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      // Sending changed table rows to the server for saving
      const response = await axios.post(
        `${BASE_URL}${PATH_NAME}/sprint_details`,
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

  // Function to fetch sprint details from the server
  const fetchData = async () => {
    try {
      // Making a GET request to fetch sprint details
      const response = await fetch(`${BASE_URL}${PATH_NAME}/sprint_details`);
      const { data } = await response.json(); // Parsing response JSON
      // Setting fetched sprint details to state variable
      setSprintDetails(data);
    } catch (error) {
      // Displaying error message using toast notification
      toast.error("Some Error");
    }
  };

  // Hook to fetch data when the component mounts
  useEffect(() => {
    fetchData(); // Calling the fetchData function
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
      {/* Container for sprint details table */}
      <Box className="escalation-matrix-table-container">
        {/* Render the Table component if sprint details are available */}
        {sprintDetails.length > 0 && (
          <Table
            defaultValues={{
              project_id: sprintDetails[0].project_id,
            }}
            allowedRoles={["Admin", "Manager"]}
            sectionTab={"sprint_details"} // Passing section tab as prop
            setShowSaveButton={setShowSaveButton} // Passing setShowSaveButton function as prop
            setChangedTableRows={setChangedTableRows} // Passing setChangedTableRows function as prop
            data={sprintDetails} // Passing sprintDetails as prop
            invalidColumns={["project_id", "_id", "__v"]} // Specifying invalid columns for table
            columnType={[
              // Specifying column types for table
              { key: "start_date", type: "date" }, // Date type column
              { key: "end_date", type: "date" }, // Date type column
              {
                key: "status",
                type: "dropdown", // Dropdown type column
                options: ["Delayed", "On-Time", "Pending", "Signed-Off"], // Dropdown options
              },
            ]}
          />
        )}
      </Box>
    </div>
  );
};

export default Project_Sprint_Details_Section; // Exporting the component
