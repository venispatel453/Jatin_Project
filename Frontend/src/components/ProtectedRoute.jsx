// ProtectedRoute.js
import React, { useEffect, useState, useContext } from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import AuthContext from "../context/AuthProvider";
import { fetchRoleOfUser } from "../util/users";

const ProtectedRoute = ({ element, ...rest }) => {
  const { auth, setAuth } = useContext(AuthContext);
  const { isAuthenticated, isLoading, user } = useAuth0();

  const setUserRole = async () => {
    try {
      const res = await fetchRoleOfUser(user.sub);
      console.log(res);
      setAuth({ id: user.sub, role: res[0].name });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      if (!isAuthenticated) return;
      setUserRole();
    } catch (error) {
      console.log(error);
    }
  }, [isAuthenticated]);

  if (isLoading || !auth.role) {
    return <div>Loading...</div>; // Handle loading state if needed
  }

  return isAuthenticated && auth?.role ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
