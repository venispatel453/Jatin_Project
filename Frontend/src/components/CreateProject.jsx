import React, { useState, useEffect } from "react";
import "../styling/create-project.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid"; // Import UUID generator
import { useNavigate } from "react-router-dom";
import { createNewUser, fetchUsersByRole } from "../util/users"; // Import utility functions
import { toast } from "react-toastify"; // Import toast notifications

const CreateProject = () => {
  const [managers, setManagers] = useState([]); // State for managers
  const navigate = useNavigate(); // Hook for navigation
  const [projectDetails, setProjectDetails] = useState({
    // State for project details
    name: "", // Name of the project
    clients: [{ _id: `auth0|${uuidv4()}`, name: "", email: "" }], // Array of clients with initial empty client
    manager: {}, // Project manager
  });
  const BASE_URL = process.env.REACT_APP_BASE_URL; // Base URL for API requests

  // Function to fetch managers
  const fetchManagers = async () => {
    try {
      const data = await fetchUsersByRole("Manager"); // Fetch managers using utility function
      setManagers(data); // Set fetched managers to state
    } catch (error) {
      toast.error("Some Error Occurred"); // Notify user in case of error
    }
  };

  // Function to handle input changes
  const handleInputChange = (attribute, value, id) => {
    let newDetails = {};
    if (attribute === "name" && !id) {
      newDetails = { ...projectDetails, name: value }; // Update project name
    } else if (attribute === "manager") {
      const manager = JSON.parse(value);
      newDetails = {
        ...projectDetails,
        manager: {
          _id: manager.user_id,
          name: manager.name,
          designation: "Manager",
        },
      }; // Update project manager
    } else {
      let clients = projectDetails.clients.map((client) => {
        if (client._id === id) {
          client[attribute] = value; // Update client name/email
          return client;
        } else {
          return client;
        }
      });
      newDetails = { ...projectDetails, clients }; // Update clients array
    }
    setProjectDetails(newDetails); // Set updated project details to state
  };

  // Function to validate input fields
  const validateInput = () => {
    let keys = Object.keys(projectDetails);
    for (const key of keys) {
      if (key === "clients") {
        const clients = projectDetails.clients;
        for (const client of clients) {
          if (client.name === "" || client.email === "") return true; // Check if client name/email is empty
        }
      } else {
        if (projectDetails[key] === "") {
          return true; // Check if other project details are empty
        }
      }
    }
    return false;
  };

  // Function to handle adding a new project
  const handleAddProject = async () => {
    try {
      const input_validation = validateInput(); // Validate input fields
      if (input_validation) {
        toast.error("Please Fill All Fields"); // Notify user if fields are not filled
        return;
      }

      const date = new Date(); // Get current date

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let currentDate = `${year}-${month}-${day}`; // Format current date

      let newProjectDetails = {
        _id: uuidv4(), // Generate UUID for project
        name: projectDetails.name, // Project name
        associated_members: {
          manager: projectDetails.manager,
          clients: projectDetails.clients,
        },
        status: "On-Going", // Initial project status
        start_date: currentDate, // Start date of project
      };
      const response = await axios.post(`${BASE_URL}/addProject`, {
        // Send POST request to add project
        ...newProjectDetails,
      });
      projectDetails.clients.forEach(async (client) => {
        await createNewUser(client, "Client"); // Create new user for each client
      });
      toast.success("Project Created Successfully"); // Notify user on successful project creation
      navigate("/"); // Redirect to home page
    } catch (error) {
      toast.error("Some Error Occurred"); // Notify user in case of error
    }
  };

  useEffect(() => {
    fetchManagers(); // Fetch managers on component mount
  }, []);

  // Render component JSX
  return (
    <div className="new-project-wrapper">
      {/* Project Details Form */}
      <div className="heading">
        <h1>Project Details</h1>
      </div>
      {/* Project Name Input */}
      <div className="box box1">
        <label>Project Name:</label>
        <input
          type="text"
          className="input-box"
          value={projectDetails?.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
      </div>

      {/* Invite Client Section */}
      <div className="box box2">
        <h2>Invite Client:</h2>
        {/* Mapping over clients */}
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
        {/* Button to add new client */}
        <button
          onClick={() => {
            let newDetails = { ...projectDetails };
            let obj = { _id: `auth0|${uuidv4()}`, name: "", email: "" };
            newDetails.clients.push(obj); // Add new client to clients array
            setProjectDetails(newDetails); // Set updated project details to state
          }}
        >
          Add Client
        </button>
      </div>

      {/* Project Manager Selection */}
      <div className="box box3">
        <label>Project Manager</label>
        {/* Dropdown for selecting project manager */}
        <select
          className="input-box"
          value={JSON.stringify(projectDetails?.manager)}
          onChange={(e) => {
            handleInputChange("manager", e.target.value);
          }}
        >
          <option value="Select Manager">Select Manager</option>
          {/* Mapping over managers */}
          {managers.map((manager, index) => {
            return (
              <option key={index} value={JSON.stringify(manager)}>
                {manager.name}
              </option>
            );
          })}
        </select>
      </div>

      {/* Button to add project */}
      <div className="project-save-button">
        <button onClick={handleAddProject}>Add Project</button>
      </div>
    </div>
  );
};

export default CreateProject;
