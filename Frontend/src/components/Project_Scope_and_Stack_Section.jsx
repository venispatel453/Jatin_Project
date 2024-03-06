import React, { useEffect, useState } from "react";
import { Dropdown } from "monday-ui-react-core";
import "monday-ui-react-core/tokens";
import "../styling/project_scope_and_stack_section.css";
import axios from "axios";
import { toast } from "react-toastify";

const Scope_and_Stack_Section = () => {
  const [projectDetails, setProjectDetails] = useState({});
  const [changesMade, setChangesMade] = useState(false);

  const handleInputFieldValidation = () => {
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
    if (field === "stack") {
      console.log(e);
      if (e == null) {
        delete newProjectDetails[field];
      } else {
        newProjectDetails[field] = {};
        newProjectDetails[field]["label"] = e.label;
        newProjectDetails[field]["value"] = e.value;
      }
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
      <div className="scope-and-stack-wrapper">
        <div className="stack-wrapper">
          <label>Select Project's Technology</label>
          <Dropdown
            searchable={false}
            className="dropdown"
            value={{
              label: projectDetails?.stack?.label,
              value: projectDetails?.stack?.value,
            }}
            onChange={(item) => handleInputChange(item, "stack")}
            options={[
              { label: "Backend", value: "backend" },
              { label: "Frontend", value: "frontend" },
              { label: "Database", value: "database" },
              { label: "Mobile-App", value: "mobile_app" },
              {
                label: "Infrasrtucture and Services",
                value: "infrastructure_and_services",
              },
            ]}
          />
        </div>
        <div className="scope-wrapper">
          <label>Scope</label>
          <textarea
            value={projectDetails?.scope}
            onChange={(e) => handleInputChange(e, "scope")}
          ></textarea>
        </div>
      </div>
    </>
  );
};

export default Scope_and_Stack_Section;
