import React from "react";

import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { styled } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";

import { useAuth } from "@context/authContext";

const useStyles = makeStyles({
  root: {
    "& .Mui-selected": {
      color: "#1672ec",
    },
  },
});

const BottomNav = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const { isLoggedIn } = currentUser;

  const classes = useStyles();

  const location = useLocation();

  return isLoggedIn ? (
    <BottomNavStyled
      className={classes.root}
      value={location.pathname}
      showLabels
    >
      <BottomNavigationAction
        component={NavLink}
        to="/dashboard/insurances"
        label={t("NavbarBottom.dashboard")}
        value={`/dashboard`}
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
        to="/notifications"
        label={t("Notifications.title")}
        value="/notifications"
        icon={<NotificationsNoneRoundedIcon />}
      />
      <BottomNavigationAction
        component={NavLink}
        to="/settings/change_info"
        label={t("NavbarBottom.settings")}
        value={`/settings/change_info`}
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
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.values.md}) {
    display: flex !important;
  }
`;

export default BottomNav;
