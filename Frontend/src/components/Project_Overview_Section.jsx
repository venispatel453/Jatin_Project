import React, { useEffect, useState } from "react";
import { Dropdown } from "monday-ui-react-core";
import "monday-ui-react-core/tokens";
import "../styling/project_overview_section.css";
import axios from "axios";

const Project_Overview_Section = () => {
  const [changesMade, setChangesMade] = useState(false);
  const [budgetMode, setBudgetMode] = useState({});
  const [projectDetails, setProjectDetails] = useState({
    overview: "",
    budget: {},
    timeline: "",
  });

  const handleSubmit = async () => {
    try {
      console.log("submit clicked");
      const { data } = await axios.post(
        "http://localhost:8000/project/project_details",
        {
          projectDetails,
        }
      );
      console.log(data);
    } catch (error) {}
  };

  const handleInputChange = (e, field) => {
    // console.log(e);
    const newProjectDetails = { ...projectDetails };
    if (field === "duration" || field === "budgeted-hours") {
      newProjectDetails["budget"] = { type: field, value: e.target.value };
    } else {
      newProjectDetails[field] = e.target.value;
    }
    console.log(newProjectDetails);
    setProjectDetails(newProjectDetails);
    setChangesMade(true);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/project/project_details"
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {changesMade && (
        <div className="save-button-container">
          <button onClick={handleSubmit}>save</button>
        </div>
      )}
      <div className="overview-section-wrapper">
        <div className="overview-div">
          <label>Project Overview</label>
          <textarea
            value={projectDetails?.overview}
            onChange={(e) => handleInputChange(e, "overview")}
          ></textarea>
        </div>
        <div className="budget-div">
          <div className="dropdown-div">
            <label> Project Budget</label>
            <Dropdown
              className="dropdown"
              searchable={false}
              onChange={(budgetMode) => setBudgetMode(budgetMode)}
              options={[
                { label: "Fixed", value: "fixed" },
                { label: "Monthly", value: "monthly" },
              ]}
            />
          </div>
          <div className="dropdown-input-div">
            {budgetMode?.label &&
              (budgetMode.label === "Fixed" ? (
                <>
                  <label> Duration (in Months)</label>
                  <input
                    type="text"
                    onChange={(e) => handleInputChange(e, "duration")}
                    value={
                      projectDetails.budget?.type == "duration"
                        ? projectDetails.budget?.value
                        : ""
                    }
                  />
                </>
              ) : (
                <>
                  <label> Budgeted Hours</label>
                  <input
                    type="text"
                    onChange={(e) => handleInputChange(e, "budgeted-hours")}
                    value={
                      projectDetails.budget?.type === "budgeted-hours"
                        ? projectDetails.budget?.value
                        : ""
                    }
                  />
                </>
              ))}
          </div>
        </div>
        <div className="timeline-div">
          <label> Timeline </label>
          <input
            type="text"
            onChange={(e) => handleInputChange(e, "timeline")}
          />
        </div>
      </div>
    </>
  );
};

export default Project_Overview_Section;
