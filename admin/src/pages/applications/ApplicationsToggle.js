import React from "react";
import { NavLink } from "react-router-dom";
import PageToggle from "@components/PageToggle";
import { useTranslation } from "react-i18next";

import { useAuth } from "@context/authContext";

const ApplicationsToggle = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const { isSendingRequest, role } = currentUser;

  return (
    <PageToggle>
      <NavLink
        to="/applications/all"
        activeClassName="selected"
        className="page-toggle__link"
      >
        {t("Applications.all")}
      </NavLink>
      {!isSendingRequest && role === "supervisor" && (
        <NavLink
          to="/applications/taken"
          activeClassName="selected"
          className="page-toggle__link"
        >
          {t("Applications.taken")}
        </NavLink>
      )}
    </PageToggle>
  );
};

export default ApplicationsToggle;
