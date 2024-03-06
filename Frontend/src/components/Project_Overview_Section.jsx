import React, { useEffect, useState } from "react";
import { Dropdown } from "monday-ui-react-core";
import "monday-ui-react-core/tokens";
import "../styling/project_overview_section.css";
import axios from "axios";
import { toast } from "react-toastify";

const Project_Overview_Section = () => {
  const [changesMade, setChangesMade] = useState(false);
  const [projectDetails, setProjectDetails] = useState({
    overview: "",
    budget: {},
    timeline: "",
  });

  const handleInputFieldValidation = () => {
    console.log(projectDetails);
    for (const key of projectDetails) {
      if (projectDetails[key] === "") {
        return true;
      }
    }
    return false;
  };

  const handleSubmit = async () => {
    try {
      if (handleInputFieldValidation) {
        toast.error("Please Fill All Fields");
        return;
      }
      const { data } = await axios.post(
        "http://localhost:8000/project/project_details",
        {
          projectDetails,
        }
      );
      toast.success("Data Saved Successfully");
      setChangesMade(false);
    } catch (error) {
      toast.error("Some Error");
    }
  };

  const handleInputChange = (e, field) => {
    const newProjectDetails = { ...projectDetails };
    if (field === "Fixed" || field === "Monthly") {
      newProjectDetails["budget"] = {
        type: field,
        type_value: e.target.value,
      };
    } else {
      newProjectDetails[field] = e.target.value;
    }
    setProjectDetails(newProjectDetails);
    setChangesMade(true);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/project/project_details"
      );

      const { data } = await response.json();
      setProjectDetails(data[0]);
    } catch (error) {
      toast.error("Some Error");
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {changesMade && (
        <div className="save-button-container">
          <button onClick={handleSubmit} className="save-button">
            Save
          </button>
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
              value={[
                {
                  value: projectDetails?.budget?.type,
                  label: projectDetails?.budget?.type,
                },
              ]}
              searchable={false}
              onChange={(budgetMode) => {
                console.log(budgetMode);
                const budget = {
                  type: budgetMode?.label,
                  type_value: "",
                };
                setProjectDetails({ ...projectDetails, budget: budget });
                setChangesMade(true);
              }}
              options={[
                { label: "Fixed", value: "Fixed" },
                { label: "Monthly", value: "Monthly" },
              ]}
            />
          </div>
          <div className="dropdown-input-div">
            {projectDetails?.budget.type &&
              (projectDetails.budget.type === "Fixed" ? (
                <>
                  <label> Duration (in Months)</label>
                  <input
                    type="text"
                    onChange={(e) => handleInputChange(e, "Fixed")}
                    value={
                      projectDetails.budget?.type == "Fixed"
                        ? projectDetails.budget?.type_value
                        : ""
                    }
                  />
                </>
              ) : (
                <>
                  <label> Budgeted Hours</label>
                  <input
                    type="text"
                    onChange={(e) => handleInputChange(e, "Monthly")}
                    value={
                      projectDetails.budget?.type === "Monthly"
                        ? projectDetails.budget?.type_value
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
            value={projectDetails.timeline}
            type="text"
            onChange={(e) => handleInputChange(e, "timeline")}
          />
        </div>
      </div>
    </>
  );
};

export default Project_Overview_Section;
