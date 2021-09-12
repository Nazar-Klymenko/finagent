import React from "react";
import { Route, Redirect } from "react-router-dom";

import Loader from "@components/Loader";

import { useSelector } from "react-redux";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn, isSendingRequest, isApproved } = useSelector(
    (state) => state.user
  );

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isSendingRequest && isLoggedIn) {
          return <Loader />;
        }
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
              to={{ pathname: "/auth/login", state: { from: props.location } }}
            />
          );
        }
      }}
    />
  );
};
