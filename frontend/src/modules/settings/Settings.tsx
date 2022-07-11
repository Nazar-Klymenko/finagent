import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import { getAllLanguageSlugs, getLanguage } from "@lib/i18n";
import {
  CircularProgress,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import i18next from "i18next";
import useSWR from "swr";

import { fetcher } from "@helpers/swrFetcher";

import { getAllAplications } from "@api/applications";

import { useAuth } from "@context/authContext";

import { Loader } from "@components/Loader";
import { Pagination } from "@components/Pagination";
import { SideNav } from "@components/SideNav";
import { Tabs } from "@components/Tabs";
import { PageContainer } from "@components/layout";

import { DeletePage } from "./settingsHelpers/DeletePage";
import { DeletePageFacebook } from "./settingsHelpers/DeletePageFacebook";
import { ChangeInfoPage } from "./settingsHelpers/InfoPage";
import { PasswordPage } from "./settingsHelpers/PasswordPage";

const Settings = (): JSX.Element => {
  const { t } = i18next;
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const { tab } = router.query;
  const { currentUser } = useAuth();
  const { provider } = currentUser;

  const { data, error } = useSWR("/user/settings", fetcher);

  return (
    <PageContainer title={t("Pages.settings")} dashboard>
      <DashboardInner>
        <Tabs
          links={provider === "facebook.com" ? linksFacebook : links}
          orientation={md ? "horizontal" : "vertical"}
          sx={{
            borderBottom: md ? 1 : 0,
            textAlign: "left",
            borderColor: "divider",
          }}
        />
        <DashboardMain>
          <DataWrapper>
            {tab === "personal" && <ChangeInfoPage />}
            {tab === "password" && <PasswordPage />}
            {tab === "delete" && provider === "facebook.com" && (
              <DeletePageFacebook />
            )}
            {tab === "delete" && provider !== "facebook.com" && <DeletePage />}
          </DataWrapper>
        </DashboardMain>
      </DashboardInner>
    </PageContainer>
  );
};

export { Settings };

const linksFacebook = [
  {
    href: "/settings/personal",
    label: "Settings.ChangeInfo.title",
    activePaths: ["/settings/personal"],
  },
  {
    href: "/settings/delete",
    label: "Settings.Disposal.title",
    activePaths: ["/settings/delete"],
  },
];
const links = [
  {
    href: "/settings/personal",
    label: "Settings.ChangeInfo.title",
    activePaths: ["/settings/personal"],
  },
  {
    href: "/settings/password",
    label: "Settings.ChangePassword.title",
    activePaths: ["/settings/password"],
  },
  {
    href: "/settings/delete",
    label: "Settings.Disposal.title",
    activePaths: ["/settings/delete"],
  },
];

const DashboardInner = styled("div")`
  display: flex;
  min-height: 100%;
  flex: 1;
  ${({ theme }) => theme.breakpoints.down("md")} {
    flex-direction: column;
  }
`;

const DataWrapper = styled("div")`
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 450px;
  ${({ theme }) => theme.breakpoints.down("md")} {
    max-width: unset;
  }
`;

const DashboardMain = styled("div")`
  display: flex;
  width: auto;
  flex-direction: column;
  overflow: hidden;
  margin-left: 20px;
  flex: 1;
  background: white;
  position: relative;
  min-height: 100%;
  padding: 16px;
  ${({ theme }) => theme.breakpoints.up("md")} {
    border-left: 1px solid ${({ theme }) => theme.palette.divider};
  }
  ${({ theme }) => theme.breakpoints.down("md")} {
    margin-left: 0;
    border-radius: 0;
  }
`;
