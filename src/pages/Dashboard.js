import React, { useEffect } from "react";
import { Info, Repos, User, Search, Navbar } from "../components";
import loadingImage from "../images/preloader.gif";
import { useGithubContext } from "../context/context";

const Dashboard = () => {
  const { isLoading, checkRequests, getUser } = useGithubContext();
  useEffect(() => {
    checkRequests();
    getUser();
  }, []);
  return (
    <main>
      <Navbar></Navbar>
      <Search></Search>
      {isLoading ? (
        <img src={loadingImage} className="loading-img" alt="loading"></img>
      ) : (
        <>
          <Info></Info>
          <User></User>
          <Repos></Repos>
        </>
      )}
    </main>
  );
};

export default Dashboard;
