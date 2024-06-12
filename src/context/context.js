import React, { useState, createContext, useContext } from "react";
import mockUser from "./mockData.js/mockUser";
import mockRepos from "./mockData.js/mockRepos";
import mockFollowers from "./mockData.js/mockFollowers";
import { customFetch } from "../utils/axios";

const GithubContext = createContext();

export const useGithubContext = () => {
  return useContext(GithubContext);
};

const AppContext = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [githubRepos, setGithubRepos] = useState(mockRepos);
  const [githubFollowers, setGithubFollowers] = useState(mockFollowers);

  const [requests, setRequests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // error
  const [error, setError] = useState({ show: false, msg: "" });

  // toggle errors
  function toggleError(show = false, msg = "") {
    setError({ show, msg });
  }

  // check how many requests remaining
  const checkRequests = async () => {
    try {
      const { data } = await customFetch(`/rate_limit`);
      setRequests(data.rate.remaining);
      if (data.rate.remaining === 0) {
        toggleError(true, "Sorry, you have exceeded your hourly rate limit!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get user
  const getUser = async (user = "john-smilga") => {
    setIsLoading(true);
    toggleError();
    try {
      // set user
      const resp = await customFetch(`users/${user}`);
      setGithubUser(resp.data);

      // set repos
      const { data: reposData } = await customFetch(
        `users/${user}/repos?per_page=100`
      );
      setGithubRepos(reposData);

      // set followers
      const { data: followersData } = await customFetch(
        `users/${user}/followers`
      );
      setGithubFollowers(followersData);

      checkRequests();
      setIsLoading(false);
    } catch (error) {
      if (error?.response?.status === 404) {
        toggleError(true, "User not found");
      } else {
        toggleError(true, "Oops, there was an error");
      }
      checkRequests();
      setIsLoading(false);
    }
  };

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        githubFollowers,
        githubRepos,
        getUser,
        requests,
        isLoading,
        error,
        checkRequests,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default AppContext;
