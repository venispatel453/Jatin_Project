import React, { useState } from "react";
import "../styling/create-project.css";
import { v4 as uuidv4 } from "uuid";
import { createNewUser } from "../util/users.js";

const CreateUser = () => {
  const [userDetails, setUserDetails] = useState({
    id: uuidv4(),
    name: "",
    email: "",
    role: "",
  });

  const handleInputChange = (attribute, value) => {
    let newUserDetails = { ...userDetails };
    newUserDetails[attribute] = value;
    setUserDetails(newUserDetails);
  };

  const handleSubmit = () => {
    createNewUser(userDetails, userDetails.role);
    console.log(userDetails);
  };

  return (
    <div className="new-project-wrapper">
      <div className="heading">
        <h1>Add User</h1>
      </div>
      <div className="box box1">
        <label>User Name:</label>
        <input
          type="text"
          className="input-box"
          value={userDetails?.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
      </div>
      <div className="box box2">
        <label>User Email:</label>
        <input
          type="email"
          className="input-box"
          value={userDetails?.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
        />
      </div>
      <div className="box box3">
        <label>User Role:</label>
        <select
          onChange={(e) => handleInputChange("role", e.target.value)}
          value={userDetails?.role}
        >
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="Manager">Project Manager</option>
          <option value="Auditor">Auditor</option>
        </select>
      </div>
      <div className="project-save-button">
        <button onClick={handleSubmit}>Add User</button>
      </div>
    </div>
  );
};

export default CreateUser;
