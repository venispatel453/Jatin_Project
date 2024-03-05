import React, { useState } from "react";
import {
  Box,
  Flex,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from "monday-ui-react-core";
import "monday-ui-react-core/tokens";
import "../styling/project.css";

import Project_Overview_Section from "./Project_Overview_Section";
import Project_Audit_History_Section from "./Project_Audit_History_Section";
import Project_Version_History_Section from "./Project_Version_History_Section";
import Project_Escalation_Matrix_Section from "./Project_Escalation_Matrix_Section";
import Project_Risk_Profiling_Section from "./Project_Risk_Profiling_Section";
import Project_Scope_and_Stack_Section from "./Project_Scope_and_Stack_Section";
import Project_Sprint_Details_Section from "./Project_Sprint_Details_Section";
import Project_Stakeholder_Section from "./Project_Stakeholder_Section";
import Project_Phases_Section from "./Project_Phases_Section";

const Project = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleExportButton = async () => {
    try {
      const response = await fetch("http://localhost:8000/project/genPDF");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box className="project-component-wrapper">
      <Flex
        direction="Column"
        gap={15}
        className="project-component-flex"
        justify="Start"
        align="Start"
      >
        <div className="export-button-container">
          <a href="http://localhost:8000/project/genPDF">
            <button className="export-button" onClick={handleExportButton}>
              Export as PDF
            </button>
          </a>
        </div>
        <div className="project-tab-box">
          <TabList
            tabType="stretched"
            onTabChange={(tabId) => {
              setActiveTab(tabId);
            }}
          >
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

        <Box className="project-section-box">
          <TabPanels activeTabId={activeTab}>
            <TabPanel>
              <Project_Overview_Section />
            </TabPanel>
            <TabPanel>
              <Project_Scope_and_Stack_Section />
            </TabPanel>
            <TabPanel>
              <Project_Escalation_Matrix_Section active={activeTab == 2} />
            </TabPanel>
            <TabPanel>
              <Project_Phases_Section />
            </TabPanel>
            <TabPanel>
              <Project_Sprint_Details_Section />
            </TabPanel>
            <TabPanel>
              <Project_Risk_Profiling_Section />
            </TabPanel>
            <TabPanel>
              <Project_Stakeholder_Section />
            </TabPanel>
            <TabPanel>
              <Project_Version_History_Section />
            </TabPanel>
            <TabPanel>
              <Project_Audit_History_Section />
            </TabPanel>
          </TabPanels>
        </Box>
      </Flex>
    </Box>
  );
};

export default Project;
