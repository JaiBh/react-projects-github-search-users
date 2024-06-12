import React from "react";
import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";
import loadingGif from "../images/preloader.gif";
import styled from "styled-components";

const PrivateRoute = () => {
  const { isAuthenticated, user, isLoading, error } = useAuth0();

  if (isLoading) {
    return (
      <Wrapper>
        <img src={loadingGif} alt="spinner" />
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper>
        <h1>{error.message}</h1>
      </Wrapper>
    );
  }

  if (!isAuthenticated && !user && !isLoading) {
    console.log({ isAuthenticated, user, isLoading });
    return <Navigate to="/login"></Navigate>;
  }

  if (isAuthenticated && user && !isLoading) {
    return (
      <>
        <Outlet></Outlet>
      </>
    );
  }
};

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  img {
    width: 150px;
  }
`;
export default PrivateRoute;
