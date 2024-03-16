import { createContext, useEffect, useState } from "react"; // Importing necessary dependencies from React

// Creating an authentication context using createContext
const AuthContext = createContext({});

// AuthProvider component definition
export const AuthProvider = ({ children }) => {
  // State variable to manage authentication data
  const [auth, setAuth] = useState({});

  // useEffect hook to log authentication data whenever it changes
  useEffect(() => {
    console.log(auth);
  }, [auth]);

  // Returning the AuthContext.Provider with the authentication context value and children
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; // Exporting the AuthContext
