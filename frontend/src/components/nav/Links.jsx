import React from "react";

import { useCallback } from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import { useAuth } from "@context/authContext";

const Links = ({ navOpen, setNavOpen }) => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const { isLoggedIn } = currentUser;

  const closeNav = useCallback(() => {
    setNavOpen(false);
  }, [setNavOpen]);
  return (
    <Nav isAuthenticated={isLoggedIn}>
      <Ul>
        {isLoggedIn && (
          <li onClick={closeNav}>
            <NavLink to="/dashboard/" activeClassName="selected" strict>
              {t("Navbar.dashboard")}
            </NavLink>
          </li>
        )}

        <li onClick={closeNav}>
          <NavLink exact activeClassName="selected" to="/services">
            {t("Navbar.services")}
          </NavLink>
        </li>

        <li onClick={closeNav}>
          <NavLink exact activeClassName="selected" to="/contact">
            {t("Navbar.contact")}
          </NavLink>
        </li>
        <li onClick={closeNav}>
          <NavLink exact activeClassName="selected" to="/help">
            {t("Navbar.help")}
          </NavLink>
        </li>
      </Ul>
    </Nav>
  );
};

export default Links;

const Nav = styled.nav`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Ul = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;

  li {
    padding: 0px 30px;
  }
  a {
    color: ${({ theme }) => theme.gray};
    transition: 0.2s;
    &:hover {
      color: ${({ theme }) => theme.black};
    }
    &.selected {
      color: ${({ theme }) => theme.black};
      position: relative;
      &::after {
        position: absolute;
        bottom: -4px;
        left: 0;
        content: "";
        height: 3px;
        width: 100%;
        border-radius: 2px;
        background: ${({ theme }) => theme.blue};
        transition: inherit;
      }
    }
  }
  @media screen and (max-width: ${({ theme }) => theme.widthTablet}) {
    display: none;
  }
`;
