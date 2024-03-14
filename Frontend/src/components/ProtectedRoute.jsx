// ProtectedRoute.js
import React, { useEffect, useState, useContext } from "react";
import { Route, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import AuthContext from "../context/AuthProvider";
import { fetchRoleOfUser } from "../util/users";

const ProtectedRoute = ({ element, ...rest }) => {
  const { auth, setAuth } = useContext(AuthContext);
  const { isAuthenticated, isLoading, user } = useAuth0();
  const [role, setRole] = useState(false);
  const navigate = useNavigate();

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
    if (isAuthenticated) setUserRole();
    else setAuth({});
  }, [isAuthenticated]);

  if (isLoading || (isAuthenticated && !auth.role)) {
    return <div>Loading...</div>; // Handle loading state if needed
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
