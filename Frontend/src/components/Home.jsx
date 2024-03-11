import React, { useEffect, useState } from "react";
import axios from "axios";
import NavigationTab from "./NavigationTab";

const Home = () => {
  const [associatedProjects, setAssociatedProjects] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const fetchData = async () => {
    try {
      let { data } = await axios.get(`${BASE_URL}/projects`, {
        params: { id: 1 },
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
      <NavigationTab data={associatedProjects} />
    </>
  );
};

export default Home;
