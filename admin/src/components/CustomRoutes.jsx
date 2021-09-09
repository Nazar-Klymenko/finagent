import React from "react";
import { Route, Redirect } from "react-router-dom";

import Loader from "@components/Loader";

import { useSelector } from "react-redux";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isSendingRequest = useSelector((state) => state.user.isSendingRequest);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isSendingRequest && isLoggedIn) {
          return <Loader />;
        }
        // if (userData.isActive === false) {
        //   return (
        //     <Redirect
        //       to={{
        //         pathname: "/activateEmail",
        //         state: { from: props.location },
        //       }}
        //     />
        //   );
        // }
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
