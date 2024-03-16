import React from "react";
import { useAuth0 } from "@auth0/auth0-react"; // Import Auth0 hook for authentication
import "../styling/login.css"; // Import CSS file for styling

// Login component
const Login = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0(); // Destructure Auth0 hook for login and authentication

  // Function to handle login
  const handleLogin = async () => {
    loginWithRedirect(); // Redirect user to Auth0 login page
  };

  return (
    <>
      {/* Render login button if user is not authenticated */}
      {!isAuthenticated && (
        <div className="login-button-container">
          <button className="login-button" onClick={() => handleLogin()}>
            log in with auth0
          </button>
        </div>
      )}
    </>
  );
};

export default Login; // Export Login component
