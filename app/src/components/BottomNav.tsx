import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import styled from "styled-components/macro";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import { useSelector } from "react-redux";

import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import AssignmentRoundedIcon from "@material-ui/icons/AssignmentRounded";
import HelpRoundedIcon from "@material-ui/icons/HelpRounded";
import SettingsRoundedIcon from "@material-ui/icons/SettingsRounded";

const useStyles = makeStyles({
  root: {
    "& .Mui-selected": {
      color: "#1672ec",
    },
  },
});

const BottomNav = () => {
  const { t } = useTranslation();
  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);

  const classes = useStyles();

  const [labelSelected, setLabelSelected] = useState("");
  const [dashboardPath, setDashboardPath] = useState("");
  const [dashboardTab, setDashboardTab] = useState("");
  const [dashboardPageNum, setDashboardPageNum] = useState("");
  const [settingsPath, setSettingsPath] = useState("");
  const location = useLocation();

  useEffect(() => {
    setDashboardPath(location.pathname.split("/")[2]);
    setDashboardTab(location.pathname.split("/")[3]);
    setDashboardPageNum(location.pathname.split("/")[4]);
    setSettingsPath(location.pathname.split("/")[2]);
    setLabelSelected(location.pathname);
  }, [location]);

  return (
    isLoggedIn && (
      <BottomNavStyled
        className={classes.root}
        value={labelSelected}
        showLabels
      >
        <BottomNavigationAction
          component={NavLink}
          to="/dashboard/insurances"
          label={t("NavbarBottom.dashboard")}
          value={`/dashboard/${dashboardPath}/${dashboardTab}/${dashboardPageNum}`}
          icon={<HomeRoundedIcon />}
        />
        <BottomNavigationAction
          component={NavLink}
          to="/services"
          label={t("NavbarBottom.services")}
          value="/services"
          icon={<AssignmentRoundedIcon />}
        />
        <BottomNavigationAction
          component={NavLink}
          to="/help"
          label={t("NavbarBottom.help")}
          value="/help"
          icon={<HelpRoundedIcon />}
        />
        <BottomNavigationAction
          component={NavLink}
          to="/settings"
          label={t("NavbarBottom.settings")}
          value={`/settings/${settingsPath}`}
          icon={<SettingsRoundedIcon />}
        />
      </BottomNavStyled>
    )
  );
};

const BottomNavStyled = styled(BottomNavigation)`
  width: 100%;
  position: sticky;
  bottom: 0;
  left: 0;
  display: none !important;
  box-shadow: 0px -3px 4px 0px rgba(0, 0, 0, 0.12);
  .MuiBottomNavigationAction-label.Mui-selected {
    font-size: 0.75rem;
    color: #1672ec;
  }

  .MuiIcon-colorPrimary.active {
    color: #1672ec;
  }
  @media screen and (max-width: ${({ theme }) => theme.widthTablet}) {
    display: flex !important;
  } ;
`;

export default BottomNav;
