import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthProvider";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuth } = useContext(AuthContext);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${BASE_URL}/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      const { data } = response;

      //tokens placeholder
      //roles placeholder

      // setAuth({email,password,tokens,roles})
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>Sign In</button>
      </form>
    </div>
  );
};

export default Login;
