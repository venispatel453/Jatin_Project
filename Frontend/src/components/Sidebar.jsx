import React, { useContext } from "react"; // Importing React library
import "../styling/sidebar.css"; // Importing CSS styles for the sidebar component
import "monday-ui-react-core/tokens"; // Importing tokens for styling
import { FaPlus } from "react-icons/fa6"; // Importing FaPlus icon from React Icons
import { NavLink } from "react-router-dom"; // Importing NavLink component from react-router-dom
import { Box, Flex } from "monday-ui-react-core"; // Importing necessary components from Monday UI React Core library
import AuthContext from "../context/AuthProvider"; // Importing AuthContext from context/AuthProvider

// Sidebar component definition
const Sidebar = () => {
  // Using useContext hook to access authentication context
  const { auth } = useContext(AuthContext);

  return (
    // Sidebar wrapper div with appropriate class name
    <div className="sidebar-wrapper">
      {/* Box component for containing the sidebar menu */}
      <Box className="sidebar-menu-box">
        <Flex justify="Center" gap={10} direction="Column">
          {/* Conditional rendering for adding project button based on user role */}
          {(auth.role === "Admin" || auth.role === "Auditor") && (
            <NavLink to="/addProject" className="menu-button-container">
              <button className="menu-button add-button-container">
                <FaPlus /> {/* Plus icon for adding project */}
                Add project
              </button>
            </NavLink>
          )}
          {/* Conditional rendering for adding user button based on user role */}
          {auth.role === "Admin" && (
            <NavLink to="/addUser" className="menu-button-container">
              <button className="menu-button">
                <i class="fas fa-user-plus" style={{ color: "#ffffff" }}></i>{" "}
                {/* User plus icon */}
                <label>add user</label>
              </button>
            </NavLink>
          )}
          {/* Navigation link to the Projects page */}
          <NavLink to="/" className="menu-button-container">
            <button className="menu-button">Projects</button>
          </NavLink>
        </Flex>
      </Box>
    </div>
  );
};

export default Sidebar; // Exporting the Sidebar component
