import React from "react"; // Importing React library
import "../styling/sidebar.css"; // Importing CSS styles for the sidebar component
import "monday-ui-react-core/tokens"; // Importing tokens for styling
import { FaPlus } from "react-icons/fa6";
import { Navigate, NavLink } from "react-router-dom";
import {
  Box,
  Menu,
  MenuItem,
  Flex,
  MenuItemButton,
} from "monday-ui-react-core"; // Importing necessary components from Monday UI React Core library

// Sidebar component definition
const Sidebar = () => {
  return (
    // Sidebar wrapper div with appropriate class name
    <div className="sidebar-wrapper">
      {/* Box component for containing the sidebar menu */}
      <Box className="sidebar-menu-box">
        {/* Flex container to align menu items */}
        <Flex justify="Center" gap={10} direction="Column">
          {/* Menu component for displaying menu items */}
          <NavLink to="/addProject">
            <button>add new project</button>
          </NavLink>
          <NavLink to="/addUser">
            <button>Add User</button>
          </NavLink>
        </Flex>
      </Box>
    </div>
  );
};

export default Sidebar; // Exporting the Sidebar component
