import PageToggle from "@components/PageToggle";
import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const Operators = () => {
  const { t } = useTranslation();
  return (
    <PageToggle>
      <NavLink
        to="/operators/all"
        activeClassName="selected"
        className="page-toggle__link"
      >
        {t("Operators.allOperators")}
      </NavLink>
      <NavLink
        to="/operators/accepting"
        activeClassName="selected"
        className="page-toggle__link"
      >
        {t("Operators.accepting")}
      </NavLink>
    </PageToggle>
  );
};

export default Operators;
