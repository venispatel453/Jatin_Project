import React, { useContext } from "react"; // Importing React library
import "../styling/sidebar.css"; // Importing CSS styles for the sidebar component
import "monday-ui-react-core/tokens"; // Importing tokens for styling
import { FaPlus, FaUser } from "react-icons/fa6";
import { Navigate, NavLink } from "react-router-dom";
import {
  Box,
  Menu,
  MenuItem,
  Flex,
  MenuItemButton,
  Button,
} from "monday-ui-react-core"; // Importing necessary components from Monday UI React Core library
import AuthContext from "../context/AuthProvider";

// Sidebar component definition
const Sidebar = () => {
  const { auth } = useContext(AuthContext);
  return (
    // Sidebar wrapper div with appropriate class name
    <div className="sidebar-wrapper">
      {/* Box component for containing the sidebar menu */}
      <Box className="sidebar-menu-box">
        {/* Flex container to align menu items */}
        <Flex justify="Center" gap={10} direction="Column">
          {/* Menu component for displaying menu items */}
          {(auth.role === "Admin" || auth.role === "Auditor") && (
            <NavLink to="/addProject" className="menu-button-container">
              <button className="menu-button add-button-container">
                <FaPlus />
                Add project
              </button>
            </NavLink>
          )}
          {auth.role === "Admin" && (
            <NavLink to="/addUser" className="menu-button-container">
              <button className="menu-button">
              <i class="fas fa-user-plus" style={{color: "#ffffff"}}></i>
                <label>add user</label>
              </button>
            </NavLink>
          )}
          <NavLink to="/" className="menu-button-container">
            <button className="menu-button">Projects</button>
          </NavLink>
        </Flex>
      </Box>
    </div>
  );
};

export default Sidebar; // Exporting the Sidebar component
