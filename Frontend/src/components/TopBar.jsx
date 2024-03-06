import React from "react"; // Importing React library
import { Flex, Box, Search, Avatar } from "monday-ui-react-core"; // Importing UI components from Monday UI library
import "monday-ui-react-core/tokens"; // Importing tokens for styling
import "../styling/topbar.css"; // Importing CSS styles for the top bar component

// Functional component for the top bar
const TopBar = () => {
  return (
    <div className="top-bar-wrapper">
      {/* Container for the top bar */}
      {/* Flex container for aligning items */}
      <Flex justify="SpaceBetween" className="bar-container">
        {/* Box 1: Company logo and name */}
        <Box className="box1">
          <Flex gap={8}>
            {/* Flex container for company logo and name */}
            <Box className="logo-container">
              {/* Container for the company logo */}
              <img src="/images/CS.png" /> {/* Company logo */}
            </Box>
            <Box className="company-name-container">
              {/* Container for the company name */}
              <label>Customer Support</label> {/* Company name */}
            </Box>
          </Flex>
        </Box>
        {/* Box 2: Search bar */}
        <Box className="box2">
          <Search placeholder="Search.." /> {/* Search input field */}
        </Box>
        {/* Box 3: User profile */}
        <Box className="box3">
          <Flex justify="Center" gap={10}>
            {/* Flex container for user avatar and info */}
            {/* User avatar */}
            <Avatar
              ariaLabel="Hadas Fahri" // Aria label for accessibility
              size="large" // Size of the avatar
              src="https://style.monday.com/static/media/person1.de30c8ee.png" // Image source
              type="img" // Type of avatar (image)
            />
            {/* User information */}
            <Box>
              <Flex direction="Column">
                {/* Flex container for user name and role */}
                <label>name</label> {/* User name */}
                <label>role</label> {/* User role */}
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </div>
  );
};

export default TopBar; // Exporting the TopBar component
