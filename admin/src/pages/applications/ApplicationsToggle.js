import React from "react";

import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import { useAuth } from "@context/authContext";

import PageToggle from "@components/PageToggle";

const ApplicationsToggle = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const { isSendingRequest, role } = currentUser;

  return (
    <PageToggle>
      <NavLink
        to="/applications/all/1"
        activeClassName="selected"
        className="page-toggle__link"
      >
        {t("Applications.all")}
      </NavLink>
      {!isSendingRequest && role === "supervisor" && (
        <NavLink
          to="/applications/taken/1"
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
