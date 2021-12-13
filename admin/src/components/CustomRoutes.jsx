import React from "react";

import { Redirect, Route } from "react-router-dom";

import { useAuth } from "@context/authContext";

import Loader from "@components/Loader";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();
  const { isLoggedIn, isSendingRequest, isApproved } = currentUser;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isSendingRequest) {
          return <Loader />;
        }
        if (!isSendingRequest) {
          if (isLoggedIn && !isApproved) {
            return (
              <Redirect
                to={{
                  pathname: "/buffer",
                  state: { from: props.location },
                }}
              />
            );
          }
          if (isLoggedIn) {
            return <Component {...props} />;
          } else {
            return (
              <Redirect
                to={{
                  pathname: "/auth/login",
                  state: { from: props.location },
                }}
              />
            );
          }
        }
      }}
    />
  );
};
