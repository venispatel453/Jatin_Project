import React, { useState, useEffect } from "react";
import "../styling/create-project.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { createNewUser, fetchUsersByRole } from "../util/users";

const CreateProject = () => {
  const [managers, setManagers] = useState([]);
  const navigate = useNavigate();
  const [projectDetails, setProjectDetails] = useState({
    name: "",
    clients: [{ _id: `auth0|${uuidv4()}`, name: "", email: "" }],
    manager: {},
  });
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const fetchManagers = async () => {
    try {
      const data = await fetchUsersByRole("Manager");
      setManagers(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (attribute, value, id) => {
    let newDetails = {};
    console.log(attribute, value);
    if (attribute === "name" && !id) {
      newDetails = { ...projectDetails, name: value };
    } else if (attribute === "manager") {
      const manager = JSON.parse(value);
      newDetails = {
        ...projectDetails,
        manager: {
          _id: manager.user_id,
          name: manager.name,
          designation: "Manager",
        },
      };
    } else {
      let clients = projectDetails.clients.map((client) => {
        if (client._id === id) {
          console.log(client["name"]);
          client[attribute] = value;
          return client;
        } else {
          return client;
        }
      });
      newDetails = { ...projectDetails, clients };
    }
    setProjectDetails(newDetails);
  };

  const handleAddProject = async () => {
    try {
      const date = new Date();

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let currentDate = `${day}-${month}-${year}`;

      let newProjectDetails = {
        _id: uuidv4(),
        name: projectDetails.name,
        associated_members: {
          manager: projectDetails.manager,
          clients: projectDetails.clients,
        },
        status: "On-Going",
        start_date: currentDate,
      };
      console.log(newProjectDetails);
      const response = await axios.post(`${BASE_URL}/addProject`, {
        ...newProjectDetails,
      });
      projectDetails.clients.forEach(async (client) => {
        await createNewUser(client, "Client");
      });
      console.log(response);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(projectDetails);
  }, [projectDetails]);

  useEffect(() => {
    fetchManagers();
  }, []);

  return (
    <div className="new-project-wrapper">
      <div className="heading">
        <h1>Project Details</h1>
      </div>
      <div className="box box1">
        <label>Project Name:</label>
        <input
          type="text"
          className="input-box"
          value={projectDetails?.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
      </div>

      <div className="box box2">
        <h2>Invite Client:</h2>
        {projectDetails.clients.map((client, index) => {
          return (
            <>
              <label>Client Name:</label>
              <input
                type="text"
                className="input-box"
                value={client.name}
                onChange={(e) =>
                  handleInputChange("name", e.target.value, client._id)
                }
              />
              <label>Client Email:</label>
              <input
                type="email"
                className="input-box"
                value={client.email}
                onChange={(e) =>
                  handleInputChange("email", e.target.value, client._id)
                }
              />
            </>
          );
        })}
        <button
          onClick={() => {
            let newDetails = { ...projectDetails };
            let obj = { _id: `auth0|${uuidv4()}`, name: "", email: "" };
            newDetails.clients.push(obj);
            setProjectDetails(newDetails);
          }}
        >
          Add Client
        </button>
      </div>

      <div className="box box3">
        <label>Project Manager</label>
        <select
          className="input-box"
          value={JSON.stringify(projectDetails?.manager)}
          onChange={(e) => {
            handleInputChange("manager", e.target.value);
          }}
        >
          <option value="Select Manager">Select Manager</option>
          {managers.map((manager, index) => {
            return (
              <option key={index} value={JSON.stringify(manager)}>
                {manager.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="project-save-button">
        <button onClick={handleAddProject}>Add Project</button>
      </div>
    </div>
  );
};

export default CreateProject;
