import React from "react";
import Layout from "./Layout";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import Project from "./components/Project";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>

      {/* protected routes */}
      <Route path="/" element={<ProtectedRoute />}>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/project/:id" element={<Project />}></Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
