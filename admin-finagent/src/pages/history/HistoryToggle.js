import React from "react";
import { NavLink } from "react-router-dom";
// import { useAuth } from "@context/authContext";
import { useTranslation } from "react-i18next";

import PageToggle from "@components/PageToggle";

const HistoryToggle = () => {
  const { t } = useTranslation();
  // const { isSendingRequest, userData } = useAuth();
  return (
    <PageToggle>
      <NavLink
        to="/history/operator-only"
        activeClassName="selected"
        className="page-toggle__link"
      >
        {t("History.myHistory")}
      </NavLink>
      {/* {!isSendingRequest && userData.role === "supervisor" && (
        <NavLink
          to="/history/supervisor-only"
          activeClassName="selected"
          className="page-toggle__link"
        >
          {t("History.allHistory")}
        </NavLink>
      )} */}
    </PageToggle>
  );
};

export default HistoryToggle;
