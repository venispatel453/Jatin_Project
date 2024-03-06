import React, { useState, useEffect } from "react"; // Importing necessary dependencies from React
import { Box, Flex } from "monday-ui-react-core"; // Importing Box and Flex components from Monday UI React Core library
import Table from "./Table.jsx"; // Importing custom Table component
import "../styling/project_escalation_matrix_section.css"; // Importing CSS styles for the component
import axios from "axios"; // Importing Axios for making HTTP requests
import { toast } from "react-toastify"; // Importing toast notifications for displaying messages

// Project_Escalation_Matrix_Section component definition
const Project_Escalation_Matrix_Section = () => {
  // State variables to manage component data and behavior
  const [escalationMatrix, setEscalationMatrix] = useState([]); // State for storing escalation matrix data
  const [changedTableRows, setChangedTableRows] = useState([]); // State for storing changed table rows
  const [showSaveButton, setShowSaveButton] = useState(false); // State to control the visibility of the save button

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      // Sending changed table rows data to the server for saving
      const response = await axios.post(
        "http://localhost:8000/project/escalation_matrix",
        [...changedTableRows]
      );
      // Displaying success message using toast notification
      toast.success("Data Saved Successfully");
      // Resetting state variables
      setShowSaveButton(false);
      setChangedTableRows([]);
    } catch (error) {
      // Displaying error message using toast notification
      toast.error("Some Error");
    }
  };

  // Function to fetch escalation matrix data from the server
  const fetchData = async () => {
    try {
      // Fetching escalation matrix data from the server
      const response = await fetch(
        "http://localhost:8000/project/escalation_matrix"
      );
      const { data } = await response.json();
      // Setting the fetched escalation matrix data to state variable
      setEscalationMatrix(data);
    } catch (error) {
      // Displaying error message using toast notification
      toast.error("Some Error");
    }
  };

  // Hook to fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures that this effect runs only once after the component mounts

  // Function to get unique escalation types from the matrix data
  const uniqueTypes = () => {
    const types = new Set();
    escalationMatrix.forEach((element) => {
      types.add(element.escalation_type);
    });
    return types;
  };

  // Render JSX
  return (
    <>
      {/* Render the save button only if showSaveButton state is true */}
      {showSaveButton && (
        <div className="save-button-container">
          <button onClick={handleSubmit} className="save-button">
            Save
          </button>
        </div>
      )}
      {/* Render the Box component containing the escalation matrix table */}
      <Box className="escalation-matrix-table">
        <Flex direction="Column" align="Start" gap={20}>
          {escalationMatrix.length > 0 && (
            <>
              {/* Map through unique escalation types and render a table for each type */}
              {Array.from(uniqueTypes()).map((type) => {
                const filteredData = escalationMatrix.filter(
                  (item) => item.escalation_type === type
                );
                return (
                  <div key={type} className="table-container">
                    <h2 className="table-heading">{type} Escalation Matrix</h2>
                    <Table
                      sectionTab={"escalation"} // Identifier for the table section
                      changedTableRows={changedTableRows} // State for changed table rows
                      data={filteredData} // Data to be displayed in the table
                      invalidColumns={[
                        "_id",
                        "__v",
                        "escalation_type",
                        "project_id",
                      ]} // List of columns to be excluded from the table
                      defaultValues={{ escalation_type: type }} // Default values for the new rows
                      columnType={[]} // Column type configuration
                      setChangedTableRows={setChangedTableRows} // Function to update changed table rows state
                      setShowSaveButton={setShowSaveButton} // Function to control the visibility of the save button
                    />
                  </div>
                );
              })}
            </>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default Project_Escalation_Matrix_Section; // Exporting Project_Escalation_Matrix_Section component
