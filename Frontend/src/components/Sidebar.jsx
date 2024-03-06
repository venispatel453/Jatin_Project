import React from "react"; // Importing React library
import "../styling/sidebar.css"; // Importing CSS styles for the sidebar component
import "monday-ui-react-core/tokens"; // Importing tokens for styling
import { Box, Menu, MenuItem, Flex } from "monday-ui-react-core"; // Importing necessary components from Monday UI React Core library

// Sidebar component definition
const Sidebar = () => {
  return (
    // Sidebar wrapper div with appropriate class name
    <div className="sidebar-wrapper">
      {/* Box component for containing the sidebar menu */}
      <Box className="sidebar-menu-box">
        {/* Flex container to align menu items */}
        <Flex justify="Center" gap={10}>
          {/* Menu component for displaying menu items */}
          <Menu>
            {/* Individual menu items */}
            <MenuItem title="Projects" />
            {/* Menu item for managing projects */}
            <MenuItem title="Projects Managers" />
            {/* Menu item for managing project managers */}
            <MenuItem title="Employees" />
            {/* Menu item for managing employees */}
          </Menu>
        </Flex>
      </Box>
    </div>
  );
};

export default Sidebar; // Exporting the Sidebar component
