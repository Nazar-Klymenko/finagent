import React from "react";
import useTitle from "@hooks/useTitle";
import { NavLink, Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components/macro";

import ChangeInfoPage from "./changingPages/ChangeInfoPage";
import ChangeEmailPage from "./changingPages/ChangeEmailPage";
import ChangePasswordPage from "./changingPages/ChangePasswordPage";
import DangerZonePage from "./changingPages/DangerZonePage";

import { PrivateRoute } from "@components/CustomRoutes/";

const Settings = () => {
  const { t } = useTranslation();
  useTitle("Settings | FinAgent");

  return (
    <SettingsStyled>
      <Menu>
        <SettingsLink
          className="settings__menu__link"
          activeClassName="selected"
          to="/settings/change_info"
        >
          {t("Settings.ChangeInfo.title")}
        </SettingsLink>

        <SettingsLink
          className="settings__menu__link"
          activeClassName="selected"
          to="/settings/change_email"
        >
          {t("Settings.ChangeEmail.title")}
        </SettingsLink>

        <SettingsLink
          className="settings__menu__link"
          activeClassName="selected"
          to="/settings/change_password"
        >
          {t("Settings.ChangePassword.title")}
        </SettingsLink>

        <SettingsLink
          className="settings__menu__link"
          activeClassName="selected"
          to="/settings/danger_zone"
        >
          {t("Settings.Disposal.title")}
        </SettingsLink>
      </Menu>
      <Overlay>
        <PrivateRoute path="/settings">
          <Redirect to="/settings/change_info" />
        </PrivateRoute>

        <PrivateRoute path="/settings/change_info">
          <ChangeInfoPage />
        </PrivateRoute>

        <PrivateRoute path="/settings/change_email">
          <ChangeEmailPage />
        </PrivateRoute>

        <PrivateRoute path="/settings/change_password">
          <ChangePasswordPage />
        </PrivateRoute>

        <PrivateRoute path="/settings/danger_zone">
          <DangerZonePage />
        </PrivateRoute>
      </Overlay>
    </SettingsStyled>
  );
};

export default Settings;

const SettingsStyled = styled.div`
  width: 70%;
  min-height: 70vh;
  border: 1px solid $BorderGray;
  background-color: #ffffff;
  box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  display: flex;
  margin: 0 auto;
  @media all and (max-width: ${({ theme }) => theme.widthPhone}) {
    border-radius: 0;
    flex-direction: column;
    flex: 1;
    width: 99%;
  }
`;
const Menu = styled.div`
  border-right: 1px solid ${({ theme }) => theme.border};
  @media all and (max-width: ${({ theme }) => theme.widthPhone}) {
    display: flex;
    flex-direction: row;
    width: 100%;
    border-bottom: 1px solid $BorderGray;
    overflow-x: auto;
    &::-webkit-scrollbar {
      height: 0.2em;
      background: white;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 8px;
      background: ${({ theme }) => theme.lightGray};
    }
  }
`;
const SettingsLink = styled(NavLink)`
  display: block;
  padding: 1rem;
  font-size: 14px;
  text-decoration: none;
  color: ${({ theme }) => theme.gray};
  white-space: nowrap;
  &.selected {
    background-color: #e1edfc;
    color: ${({ theme }) => theme.blue};
  }
  &:hover {
    background-color: #f1f1f1;
  }
  @media all and (max-width: ${({ theme }) => theme.widthPhone}) {
    padding: 0.5rem;
  }
`;
const Overlay = styled.div`
  padding: 2rem;
  width: 100%;
  @media all and (max-width: ${({ theme }) => theme.widthPhone}) {
    width: unset;
  }
`;
