import React from "react";
import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import Project from "./components/Project";
import "./styling/layout.css";
import { Box, Flex } from "monday-ui-react-core";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Flex
        className="layout-wrapper"
        direction="Column"
        gap={20}
        justify="SpaceBetween"
      >
        <Box className="top-bar-container">
          <TopBar />
        </Box>

        <Box className="main-content-wrapper">
          <Flex justify="SpaceBetween">
            <Box className="sidebar-container">
              <Sidebar />
            </Box>
            <Box className="content-container">
              <Project />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </div>
  );
};

export default Layout;
