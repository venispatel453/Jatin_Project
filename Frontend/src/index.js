import React from "react";
import ReactDOM from "react-dom/client"; // Import ReactDOM for rendering
import App from "./App"; // Import the App component
import { AuthProvider } from "./context/AuthProvider"; // Import AuthProvider for authentication context
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Import BrowserRouter and Route components for routing
import { Auth0Provider } from "@auth0/auth0-react"; // Import Auth0Provider for Auth0 authentication

// Create a new React root with ReactDOM.createRoot method, targeting the element with id "root"
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App component into the root
root.render(
  <BrowserRouter>
    {/* Auth0Provider for handling authentication */}
    <Auth0Provider
      domain="dev-34crl0ebsqxu7bk8.us.auth0.com"
      clientId="x4hI5wRq4QrNbFaxKLtRYqpUXFIWPQdl"
      audience="https://dev-34crl0ebsqxu7bk8.us.auth0.com/api/v2/"
      authorizationParams={{
        redirect_uri: "https://ec2-13-200-207-76.ap-south-1.compute.amazonaws.com:3000/",
      }}
    >
      {/* AuthProvider for managing authentication context */}
      <AuthProvider>
        {/* Routes for defining application routes */}
        <Routes>
          {/* Route for all paths, rendering the App component */}
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </Auth0Provider>
  </BrowserRouter>
);
