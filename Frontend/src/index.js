import React from "react";
import ReactDOM from "react-dom/client"; // Import ReactDOM for rendering
import App from "./App"; // Import the Layout component
import { AuthProvider } from "./context/AuthProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
// Create a new React root with ReactDOM.createRoot method, targeting the element with id "root"
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the Layout component into the root
root.render(
  <BrowserRouter>
    <Auth0Provider
      domain="dev-34crl0ebsqxu7bk8.us.auth0.com"
      clientId="x4hI5wRq4QrNbFaxKLtRYqpUXFIWPQdl"
      authorizationParams={{
        redirect_uri: "http://localhost:3000/",
      }}
    >
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthProvider>
    </Auth0Provider>
  </BrowserRouter>
);
