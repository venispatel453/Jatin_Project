import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { setAuth } = useAuth();
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  const location = useLocation();
  const from = "/";

  const handleLogin = async () => {
    loginWithRedirect();
  };



  return (
    <>
      {isAuthenticated && <Navigate to="/" />}
      {!isAuthenticated && (
        <button onClick={() => handleLogin()}>log in </button>
      )}
    </>
  );
};

export default Login;
