import React from "react";
import { Route, Redirect } from "react-router-dom";

import Loader from "@components/Loader";

import { useAuth } from "@context/authContext";

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
