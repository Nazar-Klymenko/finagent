import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

// function matchActivePath(path: string) {
//   switch (path) {
//     case "insurances": {
//       return [];
//     }
//   }
// }

const SideNav: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Nav>
      <NavLink
        activeClassName="link--selected"
        strict
        to={`/dashboard/insurances/`}
      >
        <span>{t("Dashboard.SideMenu.insurances")}</span>
      </NavLink>
      <NavLink activeClassName="link--selected" strict to={`/dashboard/loans/`}>
        <span>{t("Dashboard.SideMenu.loans")}</span>
      </NavLink>
      <NavLink activeClassName="link--selected" to={`/dashboard/archive/1`}>
        <span>{t("Dashboard.SideMenu.history")}</span>
      </NavLink>
    </Nav>
  );
};

const Nav = styled.div`
  padding: 8px;
  background-color: white;
  border-radius: 4px;
  list-style: none;
  display: flex;
  flex-direction: column;
  width: max-content;
  z-index: 15;
  height: max-content;
  border: 1px solid ${({ theme }) => theme.border};
  a {
    cursor: pointer;
    text-transform: capitalize;
    text-decoration: none;
    font-weight: 500;
    color: ${({ theme }) => theme.gray};
    display: flex;
    justify-content: center;
    padding: 8px 40px;
    border-radius: 4px;
    transition: color 0.2s ease-in-out;
  }
  .link--selected {
    color: ${({ theme }) => theme.blue} !important;
    background: ${({ theme }) => theme.lightBlue};
    box-shadow: 0px 1px 5px 0px rgba(124, 183, 255, 0.251);
    &:hover {
      color: ${({ theme }) => theme.blue};
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.widthTablet}) {
    position: sticky;
    top: 50px;
    left: 0;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-bottom: 0;
    border-radius: 0;
    border-bottom: 1px solid ${({ theme }) => theme.lightGray};
    box-shadow: none;
    width: auto;
    a {
      flex: 1;
      border-radius: 0;
      border-bottom: 2px solid transparent;
      font-size: 0.9rem;
      padding: 8px 26px;
      margin-bottom: -1px;
    }

    .link--selected {
      background: transparent;
      border-bottom: 2px solid ${({ theme }) => theme.blue} !important;
      box-shadow: none;
    }
  }
`;

export default SideNav;
