import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useData } from "@context/dataContext";
import { useHistory } from "react-router-dom";

import Loader from "@components/Loader";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn, isSendingRequest, isActive } = useSelector(
    (state) => state.user
  );

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isSendingRequest && isLoggedIn) {
          return <Loader />;
        }
        if (isLoggedIn && !isActive) {
          return (
            <Redirect
              to={{
                pathname: "/verify-email",
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

export const QuestRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn, isSendingRequest, isActive } = useSelector(
    (state) => state.user
  );

  const { currentPage, allowSummary } = useData();
  const history = useHistory();

  let currentLocation = history.location.pathname;
  let urlParted = currentLocation.split("/");
  let pageIndex = parseInt(urlParted.pop() || urlParted.pop());

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isSendingRequest && isLoggedIn) {
          return <Loader />;
        }
        if (!isLoggedIn) {
          return (
            <Redirect
              to={{
                pathname: "/auth/login",
                state: { from: props.location },
              }}
            />
          );
        }

        if (isActive === false) {
          return (
            <Redirect
              to={{
                pathname: "/verify-email",
                state: { from: props.location },
              }}
            />
          );
        }

        if (pageIndex < currentPage) {
          return <Component {...props} />;
        } else if (pageIndex === currentPage) {
          return <Component {...props} />;
        } else if (allowSummary) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: `./${currentPage}`,
                state: { from: props.location },
              }}
            />
          );
        }
      }}
    />
  );
};
