import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import NavigationTab from "./NavigationTab";
import AuthContext from "../context/AuthProvider";

const Home = () => {
  const [associatedProjects, setAssociatedProjects] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { auth } = useContext(AuthContext);

  const fetchData = async () => {
    try {
      //console.log(`${BASE_URL}/projects`, process.env.REACT_APP_BASE_URL);
      let { data } = await axios.get(`${BASE_URL}/projects`, {
        params: { id: auth.id },
      });
      console.log(data);
      data = data.data;
      setAssociatedProjects(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {console.log(associatedProjects)}
      {associatedProjects?.length > 0 && (
        <NavigationTab data={associatedProjects} />
      )}
    </>
  );
};

export default Home;
