import { useEffect, useState } from "react";

import { useRouter } from "next/router";

import {
  CircularProgress,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import useSWR from "swr";

import { fetcher } from "@helpers/swrFetcher";

import { getAllAplications } from "@api/applications";

import { useAuth } from "@context/authContext";

import { Loader } from "@components/Loader";
import { Pagination } from "@components/Pagination";
import { SideNav } from "@components/SideNav";
import { Tabs } from "@components/Tabs";
import { PageContainer } from "@components/layout";

const Settings = (): JSX.Element => {
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
        {md ? <Tabs links={links} /> : <SideNav links={links} />}
        <DashboardMain>
          <Typography variant="h6">Ustawienia</Typography>

          <DataWrapper></DataWrapper>
        </DashboardMain>
      </DashboardInner>
    </PageContainer>
  );
};

export { Settings };

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
`;

const DashboardMain = styled(Paper)`
  display: flex;
  width: auto;
  flex-direction: column;
  overflow: hidden;
  margin-left: 20px;
  flex: 1;
  background: white;
  border-radius: 4px;
  position: relative;
  min-height: 100%;
  padding: 16px;
  .empty {
    text-align: center;
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translate(-50%, -50%);
    color: ${({ theme }) => theme.palette.grey[400]};
  }

  ${({ theme }) => theme.breakpoints.down("md")} {
    margin-left: 0;
    border-radius: 0;
  }
`;
