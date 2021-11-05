import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";

import UserDropdown from "./UserDropdown";
import LanguageMenu from "./LanguageMenu";

import { UserAuth } from "@components/buttons";

import LogoWrap from "@components/LogoWrap";
import {
  Logo,
  SideApplications,
  SideClients,
  SideMyApplications,
  SideCalendar,
  SideArchive,
} from "@components/svgs";

import { useAuth } from "@context/authContext";

const Navbar: React.FC = () => {
  const { t } = useTranslation();

  const { currentUser } = useAuth();
  const { isLoggedIn } = currentUser;
  const { pathname } = useLocation();

  return (
    <>
      <NavbarColumn>
        <LogoWrap>
          <Logo fillColor="#FFFFFF" />
        </LogoWrap>

        <NavLink
          to="/applications/all"
          isActive={() => {
            let matches = ["/applications/all", "/applications/taken"].includes(
              pathname
            );
            return matches;
          }}
          activeClassName="selected"
          className="item"
        >
          <SideApplications />
          <span>{t("Navbar.applications")}</span>
        </NavLink>
        <NavLink to="/clients" activeClassName="selected" className="item">
          <SideClients />
          <span>{t("Navbar.clients")}</span>
        </NavLink>
        <NavLink
          to="/applications/my-applications"
          activeClassName="selected"
          className="item"
        >
          <SideMyApplications />
          <span>{t("Navbar.myApplications")}</span>
        </NavLink>
        <NavLink
          isActive={() => {
            let matches = [
              "/history/operator-only/1",
              "/history/supervisor-only/1",
            ].includes(pathname);
            return matches;
          }}
          to="/history/operator-only/1"
          activeClassName="selected"
          className="item"
        >
          <SideCalendar />
          <span>{t("Navbar.history")}</span>
        </NavLink>
        <NavLink
          to="/applications/archived"
          activeClassName="selected"
          className="item"
        >
          <SideArchive />
          <span>{t("Navbar.archive")}</span>
        </NavLink>
      </NavbarColumn>

      <NavbarRow>
        <NavbarRowContext>
          <LanguageMenu />
          {isLoggedIn ? <UserDropdown /> : <UserAuth />}
        </NavbarRowContext>
      </NavbarRow>
    </>
  );
};

const NavbarColumn = styled.div`
  width: 13rem;
  background: ${({ theme }) => theme.adminBlue};
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100%;
  .item {
    padding-left: 16px;
    font-size: 14px;
    height: 40px;
    max-height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: white;
    text-decoration: none;
    position: relative;
    &.selected {
      background: ${({ theme }) => theme.gray};
      &::before {
        content: "";
        width: 5px;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background-color: ${({ theme }) => theme.blue};
        border-radius: 0px 6px 6px 0px;
      }
    }
    span {
      padding-left: 8px;
    }
  }
`;

const NavbarRow = styled.div`
  background: white;
  min-height: 50px;
  max-height: 50px;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  display: flex;
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.1);
`;
const NavbarRowContext = styled.div`
  padding: 0 12px;
  display: flex;
  flex-direction: row;
`;

export default Navbar;
