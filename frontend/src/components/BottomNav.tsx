import React from "react";

import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";

import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

import useLayoutTranslation from "@hooks/useLayoutTranslation";

import { useAuth } from "@context/authContext";

const BottomNav = (): JSX.Element => {
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
    <Paper
      sx={{ position: "sticky", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation
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
      </BottomNavigation>
    </Paper>
  );
};

export { BottomNav };
