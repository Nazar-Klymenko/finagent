import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@context/authContext";
import { useTranslation } from "react-i18next";

import PageToggle from "@components/PageToggle";

const HistoryToggle = () => {
  const { t } = useTranslation();
  const { isSendingRequest, currentUser } = useAuth();
  return (
    <PageToggle>
      <NavLink
        to="/history/my-history/1"
        activeClassName="selected"
        className="page-toggle__link"
      >
        {t("History.myHistory")}
      </NavLink>
      {!isSendingRequest && currentUser.role === "supervisor" && (
        <NavLink
          to="/history/all/1"
          activeClassName="selected"
          className="page-toggle__link"
        >
          {t("History.allHistory")}
        </NavLink>
      )}
    </PageToggle>
  );
};

export default HistoryToggle;
