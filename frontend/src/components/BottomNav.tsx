import React from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
// import { NavLink, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useTranslation } from "next-i18next";

import useLayoutTranslation from "@hooks/useLayoutTranslation";

import { useAuth } from "@context/authContext";

const BottomNav = () => {
  const router = useRouter(),
    { locale } = router;
  //@ts-ignore
  const { _t } = useLayoutTranslation(locale);

  const { currentUser } = useAuth();
  const { isLoggedIn } = currentUser;
  const [value, setValue] = React.useState(0);

  const onLink = (href: string) => {
    router.push(href);
  };

  return (
    <BottomNavStyled
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction
        label={_t("NavbarBottom.dashboard")}
        onClick={() => onLink("/dashboard")}
        icon={<HomeRoundedIcon />}
      />
      <BottomNavigationAction
        label={_t("NavbarBottom.services")}
        onClick={() => onLink("/services")}
        icon={<AssignmentRoundedIcon />}
      />
      <BottomNavigationAction
        onClick={() => onLink("/notifications")}
        label={_t("NavbarBottom.notifications")}
        icon={<NotificationsIcon />}
      />
      <BottomNavigationAction
        label={_t("NavbarBottom.settings")}
        onClick={() => onLink("/settings")}
        icon={<SettingsRoundedIcon />}
      />
    </BottomNavStyled>
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
  ${({ theme }) => theme.breakpoints.down("md")} {
    display: flex !important;
  }
`;

export default BottomNav;
