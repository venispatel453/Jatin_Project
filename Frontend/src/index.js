import React from "react";
import ReactDOM from "react-dom/client"; // Import ReactDOM for rendering
import Layout from "./Layout"; // Import the Layout component
import AuthProvider from "./context/AuthProvider";

// Create a new React root with ReactDOM.createRoot method, targeting the element with id "root"
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the Layout component into the root
root.render(
  <AuthProvider>
    <Layout />
  </AuthProvider>
);
