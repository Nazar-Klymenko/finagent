import { Box, Paper, Switch, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import useSWR from "swr";

import { fetcher } from "@helpers/swrFetcher";

import Loader from "@components/Loader";
import MuiPagination from "@components/MuiPagination";

import Card from "./Card";

const Dashboard = (): JSX.Element => {
  const { data, error } = useSWR("/user/applications/insurance", fetcher);

  if (!data && !error) return <Loader />;
  console.log(data);

  return (
    <DashboardMain>
      {data?.length > 0 &&
        data.map((app: any) => <Card key={app.id} app={app} />)}
      <MuiPagination
        category="insurance"
        currentPage={1}
        maximumPages={1}
        status="ready"
      />
    </DashboardMain>
  );
};

export default Dashboard;

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
