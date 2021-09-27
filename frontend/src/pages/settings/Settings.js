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
import { ContentWrap } from "@components/content";

const Settings = () => {
  const { t } = useTranslation();
  useTitle("Settings | FinAgent");

  return (
    <ContentWrap blank flipDirection fullWidth P0>
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
      <ActionZone>
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
      </ActionZone>
    </ContentWrap>
  );
};

export default Settings;

const Menu = styled.div`
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 4px;
  height: max-content;
  @media all and (max-width: ${({ theme }) => theme.widthTablet}) {
    display: flex;
    flex-direction: row;
    border-radius: 0;
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
  padding: 0.75rem 1rem;
  font-size: 14px;
  text-decoration: none;
  white-space: nowrap;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  &:last-of-type {
    border-bottom: none;
  }
  @media all and (max-width: ${({ theme }) => theme.widthTablet}) {
    border-bottom: none;
  }

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
const ActionZone = styled.div`
  padding: 0 2rem;
  width: 100%;

  @media screen and (max-width: ${({ theme }) => theme.widthTablet}) {
    padding: 1rem 2rem;
  }
`;

const Overlay = styled.div`
  max-width: 600px;
`;
