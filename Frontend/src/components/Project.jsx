import React, { useState } from "react"; // Importing React and useState hook
import {
  Box,
  Flex,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from "monday-ui-react-core"; // Importing necessary components from Monday UI React Core library
import "monday-ui-react-core/tokens"; // Importing tokens for styling
import "../styling/project.css"; // Importing CSS styles for the component

// Importing individual sections/components related to the project
import Project_Overview_Section from "./Project_Overview_Section";
import Project_Audit_History_Section from "./Project_Audit_History_Section";
import Project_Version_History_Section from "./Project_Version_History_Section";
import Project_Escalation_Matrix_Section from "./Project_Escalation_Matrix_Section";
import Project_Risk_Profiling_Section from "./Project_Risk_Profiling_Section";
import Project_Scope_and_Stack_Section from "./Project_Scope_and_Stack_Section";
import Project_Sprint_Details_Section from "./Project_Sprint_Details_Section";
import Project_Stakeholder_Section from "./Project_Stakeholder_Section";
import Project_Phases_Section from "./Project_Phases_Section";

// Project component definition
const Project = () => {
  // State variable to manage the active tab
  const [activeTab, setActiveTab] = useState(0);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // Function to handle exporting data as PDF
  const handleExportButton = async () => {
    try {
      // Making a GET request to generate PDF
      const response = await fetch(`${BASE_URL}/project/genPDF`);
    } catch (error) {
      console.log(error);
    }
  };

  // Render JSX
  return (
    <Box className="project-component-wrapper">
      <Flex
        direction="Column"
        gap={15}
        className="project-component-flex"
        justify="Start"
        align="Start"
      >
        {/* Container for export button */}
        <div className="export-button-container">
          {/* Export button */}
          <a href={`${BASE_URL}/project/genPDF`} download>
            {/* Anchor tag to initiate PDF download */}
            <button className="export-button" onClick={handleExportButton}>
              Export as PDF
            </button>
          </a>
        </div>
        {/* Container for project tabs */}
        <div className="project-tab-box">
          {/* Tab list */}
          <TabList
            tabType="stretched"
            onTabChange={(tabId) => {
              setActiveTab(tabId);
            }}
          >
            {/* Individual tabs */}
            <Tab>Project Overview</Tab>
            <Tab>Scope and Stack</Tab>
            <Tab>Escalation Matrix</Tab>
            <Tab>Phases</Tab>
            <Tab>Sprint Details</Tab>
            <Tab>Risk Profiling</Tab>
            <Tab>Stakeholders</Tab>
            <Tab>Version History</Tab>
            <Tab>Audit History</Tab>
          </TabList>
        </div>

        {/* Container for project sections */}
        <Box className="project-section-box">
          {/* Tab panels */}
          <TabPanels activeTabId={activeTab}>
            {/* Individual tab panels */}
            <TabPanel>
              {/* Project Overview Section */}
              <Project_Overview_Section />
            </TabPanel>
            <TabPanel>
              {/* Scope and Stack Section */}
              <Project_Scope_and_Stack_Section />
            </TabPanel>
            <TabPanel>
              {/* Escalation Matrix Section */}
              <Project_Escalation_Matrix_Section />
            </TabPanel>
            <TabPanel>
              {/* Phases Section */}
              <Project_Phases_Section />
            </TabPanel>
            <TabPanel>
              {/* Sprint Details Section */}
              <Project_Sprint_Details_Section />
            </TabPanel>
            <TabPanel>
              {/* Risk Profiling Section */}
              <Project_Risk_Profiling_Section />
            </TabPanel>
            <TabPanel>
              {/* Stakeholders Section */}
              <Project_Stakeholder_Section />
            </TabPanel>
            <TabPanel>
              {/* Version History Section */}
              <Project_Version_History_Section />
            </TabPanel>
            <TabPanel>
              {/* Audit History Section */}
              <Project_Audit_History_Section />
            </TabPanel>
          </TabPanels>
        </Box>
      </Flex>
    </Box>
  );
};

export default Project; // Exporting the Project component
