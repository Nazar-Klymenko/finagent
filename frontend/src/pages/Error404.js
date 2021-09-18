import React from "react";

import { NavLink } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="error404-page">
      <span>
        4<span>0</span>4
      </span>
      <h1>Sorry, we couln't find this page</h1>
      <NavLink to="/dashboard">To Dashboard</NavLink>
    </div>
  );
};
export default Error404;
