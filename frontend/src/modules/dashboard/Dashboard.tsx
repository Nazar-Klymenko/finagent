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

import Card from "./Card";

const Dashboard = (): JSX.Element => {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));
  const router = useRouter();
  const { tab } = router.query;

  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [maximumPages, setMaximumPages] = useState(1);

  let { data, error } = useSWR(
    `/user/applications/${tab}?page=${pageIndex}&size=${pageSize}`,
    fetcher
  );
  let applications = data?.applications;
  useEffect(() => {
    if (data) setMaximumPages(data.maximumPages);
  }, [data]);
  return (
    <PageContainer title={t("Dashboard.title")} dashboard>
      <DashboardInner>
        {md ? <Tabs links={links} /> : <SideNav links={links} />}
        <DashboardMain>
          <Typography variant="h6">Twoje ankiety</Typography>

          <DataWrapper>
            {!data && !error && <Loader />}
            {applications?.length > 0 &&
              applications.map((app: any) => <Card key={app.id} app={app} />)}
          </DataWrapper>

          <Pagination
            currentPage={pageIndex}
            setCurrentPage={setPageIndex}
            maximumPages={maximumPages}
          />
        </DashboardMain>
      </DashboardInner>
    </PageContainer>
  );
};

export { Dashboard };

const links = [
  {
    href: "/dashboard/insurance",
    label: "Dashboard.SideMenu.insurances",
    activePaths: ["/dashboard/insurance"],
  },
  {
    href: "/dashboard/loan",
    label: "Dashboard.SideMenu.loans",
    activePaths: ["/dashboard/loan"],
  },
  {
    href: "/dashboard/archive",
    label: "Dashboard.SideMenu.history",
    activePaths: ["/dashboard/archive"],
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
