import React from "react";

import ArchiveIcon from "@material-ui/icons/Archive";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import DateRangeIcon from "@material-ui/icons/DateRange";
import MailIcon from "@material-ui/icons/Mail";
import PeopleIcon from "@material-ui/icons/People";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components/macro";

import { useAuth } from "@context/authContext";

import LogoWrap from "@components/LogoWrap";
import { UserAuth } from "@components/buttons";
import { Logo } from "@components/svgs";

import LanguageMenu from "./LanguageMenu";
import UserDropdown from "./UserDropdown";

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
          to="/applications/all/1"
          isActive={() => {
            const regex = /applications\/(all|taken)\/\d+/gm;
            const matches = regex.test(pathname);
            return matches;
          }}
          activeClassName="selected"
          className="item"
        >
          <AssignmentIcon />
          <span>{t("Navbar.applications")}</span>
        </NavLink>
        <NavLink
          isActive={() => {
            const regex = /clients\/(all|taken)\/\d+/gm;
            const matches = regex.test(pathname);
            return matches;
          }}
          to="/clients/all/1"
          activeClassName="selected"
          className="item"
        >
          <PeopleIcon />
          <span>{t("Navbar.clients")}</span>
        </NavLink>
        <NavLink
          to="/applications/my-applications/1"
          isActive={() => {
            const regex = /applications\/my-applications\/\d+/gm;
            const matches = regex.test(pathname);
            return matches;
          }}
          activeClassName="selected"
          className="item"
        >
          <AssignmentIndIcon />
          <span>{t("Navbar.myApplications")}</span>
        </NavLink>
        <NavLink
          to="/tickets/all/1"
          isActive={() => {
            const regex = /tickets\/all\/\d+/gm;
            const matches = regex.test(pathname);
            return matches;
          }}
          activeClassName="selected"
          className="item"
        >
          <MailIcon />
          <span>{t("Navbar.tickets")}</span>
        </NavLink>
        <NavLink
          isActive={() => {
            const regex = /history\/(my-history|all)\/\d+/gm;
            const matches = regex.test(pathname);
            return matches;
          }}
          to="/history/my-history/1"
          activeClassName="selected"
          className="item"
        >
          <DateRangeIcon />
          <span>{t("Navbar.history")}</span>
        </NavLink>
        <NavLink
          to="/applications/archived/1"
          isActive={() => {
            const regex = /applications\/archived\/\d+/gm;
            const matches = regex.test(pathname);
            return matches;
          }}
          activeClassName="selected"
          className="item"
        >
          <ArchiveIcon />
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
