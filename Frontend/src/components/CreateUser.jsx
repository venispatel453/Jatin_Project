import React, { useState } from "react";
import "../styling/create-project.css";
import { v4 as uuidv4 } from "uuid"; // Import UUID generator
import { createNewUser } from "../util/users.js"; // Import utility function for creating a new user
import { toast } from "react-toastify"; // Import toast notifications

const CreateUser = () => {
  // State for user details
  const [userDetails, setUserDetails] = useState({
    id: uuidv4(), // Generate unique user ID
    name: "", // User's name
    email: "", // User's email
    role: "", // User's role
  });

  // Function to validate input fields
  const validateInput = () => {
    let keys = Object.keys(userDetails);
    for (const key of keys) {
      if (userDetails[key] === "") {
        return true; // Return true if any field is empty
      }
    }
    return false; // Return false if all fields are filled
  };

  // Function to handle input changes
  const handleInputChange = (attribute, value) => {
    let newUserDetails = { ...userDetails };
    newUserDetails[attribute] = value; // Update user details with new value
    setUserDetails(newUserDetails); // Set updated user details to state
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    const input_validation = validateInput(); // Validate input fields
    if (input_validation) {
      toast.error("Please Fill All Input Fields"); // Notify user if fields are not filled
      return;
    }
    const response = await createNewUser(userDetails, userDetails.role); // Create new user
    if (response.status === "error") {
      toast.error(response.message); // Notify user if an error occurs during user creation
    } else {
      toast.success("User Created Successfully"); // Notify user on successful user creation
      // Reset user details after successful creation
      setUserDetails({
        id: uuidv4(), // Generate new unique user ID
        name: "", // Reset user's name
        email: "", // Reset user's email
        role: "", // Reset user's role
      });
    }
  };

  // Render component JSX
  return (
    <div className="new-project-wrapper">
      {/* Heading */}
      <div className="heading">
        <h1>Add User</h1>
      </div>
      {/* User Name Input */}
      <div className="box box1">
        <label>User Name:</label>
        <input
          type="text"
          className="input-box"
          value={userDetails?.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
      </div>
      {/* User Email Input */}
      <div className="box box2">
        <label>User Email:</label>
        <input
          type="email"
          className="input-box"
          value={userDetails?.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
        />
      </div>
      {/* User Role Selection */}
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
      {/* Button to add user */}
      <div className="project-save-button">
        <button onClick={handleSubmit}>Add User</button>
      </div>
    </div>
  );
};

export default CreateUser;
