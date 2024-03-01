import React, { useEffect, useState } from "react";
import { Dropdown } from "monday-ui-react-core";
import "monday-ui-react-core/tokens";
import "../styling/project_scope_and_stack_section.css";

const Scope_and_Stack_Section = () => {
  const [projectDetails, setProjectDetails] = useState({});
  const [changesMade, setChangesMade] = useState(false);

  const handleSubmit = () => {};

  const handleInputChange = (e, field) => {
    console.log(e, field);
    const newProjectDetails = { ...projectDetails };
    if (field === "stack") {
      if (e == null) {
        delete newProjectDetails[field];
      } else {
        newProjectDetails[field] = e.value;
      }
    } else {
      newProjectDetails[field] = e.target.value;
    }

    console.log(newProjectDetails);
    setProjectDetails(newProjectDetails);
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
      <div className="scope-and-stack-wrapper">
        <div className="stack-wrapper">
          <label>Select Project's Technology</label>
          <Dropdown
            searchable={false}
            className="dropdown"
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
