import React from "react";
// import makeStyles from '@mui/styles/makeStyles';

import styled from "styled-components/macro";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import { useAuth } from "@context/authContext";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

// const useStyles = makeStyles({
//   root: {
//     "& .Mui-selected": {
//       color: "#1672ec",
//     },
//   },
// });

const BottomNav = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const { isLoggedIn } = currentUser;

  // const classes = useStyles();

  const location = useLocation();

  return isLoggedIn ? (
    <BottomNavStyled
      // className={classes.root}
      value={location.pathname}
      showLabels
    >
      <BottomNavigationAction
        component={NavLink}
        to="/dashboard/insurances"
        label={t("NavbarBottom.dashboard")}
        value={`/dashboard/`}
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
        value={`/settings/`}
        icon={<SettingsRoundedIcon />}
      />
    </BottomNavStyled>
  ) : null;
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
