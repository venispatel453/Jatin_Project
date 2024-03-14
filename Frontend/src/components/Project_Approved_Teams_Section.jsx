import React, { useState, useEffect } from "react"; // Importing React and necessary hooks
import { Box } from "monday-ui-react-core"; // Importing Box component from Monday UI React Core library
import "monday-ui-react-core/tokens"; // Importing tokens for styling
import Table from "./Table"; // Importing custom Table component
import axios from "axios"; // Importing Axios for making HTTP requests
import "../styling/project_approved_teams_section.css"; // Importing CSS styles for the component
import { toast } from "react-toastify"; // Importing toast notifications for displaying messages

const Project_Approved_Teams_Section = () => {
  const [approvedTeams, setApprovedTeams] = useState([]); // State to manage stakeholders data
  const [changedTableRows, setChangedTableRows] = useState([]); // State to track changed table rows
  const [showSaveButton, setShowSaveButton] = useState(false); // State to control visibility of save button
  const [categories, setCategories] = useState([]);
  const [activeAccordion, setActiveAccordion] = useState([]);

  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const PATH_NAME = new URL(window.location.href).pathname;

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      // Sending changed table rows to the server for saving
      const response = await axios.post(
        `${BASE_URL}${PATH_NAME}/client_feedback`,
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

  const filterCategories = () => {
    const uniqueCategories = new Set();
    approvedTeams.forEach((row) => {
      uniqueCategories.add(row.category);
    });
    console.log(Array.from(uniqueCategories));
    setCategories(Array.from(uniqueCategories));
  };

  useEffect(() => {
    filterCategories();
  }, [approvedTeams]);

  // Function to fetch stakeholders data from the server
  const fetchData = async () => {
    try {
      // Making a GET request to fetch stakeholders data
      const response = await fetch(`${BASE_URL}${PATH_NAME}/approved_teams`);
      const { data } = await response.json(); // Parsing response JSON
      console.log(data);
      // Setting fetched stakeholders data to state variable
      setApprovedTeams(data);
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
      {/* Container for stakeholders table */}
      <Box className="escalation-matrix-table-container">
        {/* Render the Table component if stakeholders data is available */}
        {/* {categories.length > 0 && (
          <Table
            sectionTab={"approved_teams"} // Passing section tab as prop
            setShowSaveButton={setShowSaveButton} // Passing setShowSaveButton function as prop
            setChangedTableRows={setChangedTableRows} // Passing setChangedTableRows function as prop
            data={approvedTeams} // Passing stakeholders data as prop
            invalidColumns={["project_id", "_id", "__v"]} // Specifying invalid columns for table
            columnType={[]} // Specifying column types for table
          />
        )} */}
        <div>
          {console.log("lengrth", categories.length)}
          {categories.length > 0 &&
            categories.map((category, index) => (
              <div key={index} className="approved_team_accordian">
                {/* Accordion header */}
                <div
                  className="accordion-header"
                  onClick={() =>
                    setActiveAccordion(activeAccordion === index ? null : index)
                  }
                >
                  {category}
                  {activeAccordion === index ? (
                    <i className="fas fa-angle-up"></i>
                  ) : (
                    <i className="fas fa-angle-down"></i>
                  )}
                </div>
                {/* Accordion content */}
                {activeAccordion === index && (
                  <div
                    className={`accordion-content ${
                      activeAccordion === index ? "active" : ""
                    }`}
                  >
                    <Table
                      sectionTab={category} // Pass category as section tab
                      defaultValues={{
                        project_id: approvedTeams[0].project_id,
                      }}
                      setShowSaveButton={setShowSaveButton}
                      setChangedTableRows={setChangedTableRows}
                      data={approvedTeams.filter(
                        (team) => team.category === category
                      )} // Filter data based on category
                      invalidColumns={["project_id", "_id", "__v"]}
                      columnType={[]}
                    />
                  </div>
                )}
              </div>
            ))}
        </div>
      </Box>
    </div>
  );
};

export default Project_Approved_Teams_Section;
