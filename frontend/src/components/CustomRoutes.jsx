import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useData } from "@context/dataContext";
import { useHistory } from "react-router-dom";

import Loader from "@components/Loader";
import { useAuth } from "@context/authContext";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();
  const { isLoggedIn, isSendingRequest, isActive } = currentUser;
  localStorage.setItem("onSignIn", "false");
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isSendingRequest) {
          return <Loader />;
        }

        if (!isSendingRequest) {
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

export const QuestRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();
  const { isLoggedIn, isSendingRequest, isActive } = currentUser;

  const { currentPage, allowSummary } = useData();
  const history = useHistory();

  let currentLocation = history.location.pathname;
  let urlParted = currentLocation.split("/");
  let pageIndex = parseInt(urlParted.pop() || urlParted.pop());
  localStorage.setItem("onSignIn", "false");
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isSendingRequest) {
          return <Loader />;
        }

        if (!isSendingRequest) {
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
        }
      }}
    />
  );
};
