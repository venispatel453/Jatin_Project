import { useContext } from "react"; // Importing the useContext hook from React
import AuthContext from "../context/AuthProvider"; // Importing the AuthContext from the AuthProvider context

// Custom hook definition to access authentication context
const useAuth = () => {
  return useContext(AuthContext); // Using the useContext hook to access the authentication context
};

export default useAuth; // Exporting the useAuth custom hook
