import { useTranslation } from "next-i18next";

import { Box, Paper, Switch, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import useSWR from "swr";

import { fetcher } from "@helpers/swrFetcher";

import useDatefnsLocalized from "@hooks/useDatefnsLocalized";

import Loader from "@components/Loader";
import SummaryList from "@components/SummaryList";
import { BackArrow } from "@components/buttons";

import { Status } from "./Status";

interface Props {
  id: string | string[] | undefined;
}
const Application = ({ id }: Props): JSX.Element => {
  const { data, error } = useSWR(`/user/applications/specific/${id}`, fetcher);
  const { t } = useTranslation();
  const { formatDistanceToNow, format } = useDatefnsLocalized();

  console.log(data);

  if (!data && !error) return <Loader />;

  return (
    <ApplicationMain>
      <ApplicationHeader>
        <BackArrow />
        <Typography variant="h6" sx={{ flex: "1", mx: "0.5rem" }}>
          {t("Basic.ApplicationType." + data?.type)}
        </Typography>
      </ApplicationHeader>

      <ApplicationBody>
        <InfoContainer>
          <Cell>
            <Typography
              className="key"
              sx={{ typography: { sm: "body1", xs: "body2" } }}
            >
              {t("Dashboard.ApplicationCard.name")}
            </Typography>
            <Typography
              className="value"
              sx={{ typography: { sm: "body1", xs: "body2" } }}
            >
              {data.user?.fullName}
            </Typography>
          </Cell>
          <Cell>
            <Typography
              className="key"
              sx={{ typography: { sm: "body1", xs: "body2" } }}
            >
              {t("Dashboard.ApplicationCard.createdAt")}
            </Typography>
            <Typography
              className="value"
              sx={{ typography: { sm: "body1", xs: "body2" } }}
            >
              {format(new Date(data.createdAt))}
            </Typography>
          </Cell>
          <Cell>
            <Typography
              className="key"
              sx={{ typography: { sm: "body1", xs: "body2" } }}
            >
              {t("Dashboard.ApplicationCard.updatedAt")}
            </Typography>
            <Typography
              className="value"
              sx={{ typography: { sm: "body1", xs: "body2" } }}
            >
              {formatDistanceToNow(new Date(data.updatedAt))}
            </Typography>
          </Cell>
        </InfoContainer>

        <SummaryList
          inDashboard
          header={t("ApplicationOpen.Summary.summary")}
          array={Object.entries(data)}
          applicationType={data.applicationType}
        />
        <Status currentStep={data.status} />
      </ApplicationBody>
    </ApplicationMain>
  );
};

export default Application;

const InfoContainer = styled("div")`
  display: flex;
  padding-top: 12px;
  ${({ theme }) => theme.breakpoints.down("md")} {
    flex-direction: column;
  }
`;
const Cell = styled("div")`
  display: flex;
  flex-direction: column;
  min-width: max-content;
  min-width: 9rem;
  padding-right: 32px;
  .key {
    margin-bottom: 4px;
  }
  ${({ theme }) => theme.breakpoints.down("md")} {
    flex-direction: row;
    align-items: center;
    padding: 0.4rem;
    .key {
      min-width: 180px;
      margin-bottom: 0px;
    }
    .value {
      min-width: 180px;
      margin-left: 24px;
    }
  }
  ${({ theme }) => theme.breakpoints.down("sm")} {
    .key {
      min-width: 100px;
      margin-bottom: 0px;
    }
    .value {
      min-width: 140px;
      margin-left: 24px;
    }
  }
  ${({ theme }) => theme.breakpoints.down("xs")} {
    .key {
      min-width: 100px;
      margin-bottom: 0px;
    }
    .value {
      min-width: 140px;
      margin-left: 24px;
    }
  }
`;

const ApplicationHeader = styled("div")`
  display: flex;
  align-items: center;
  padding: 8px 16px;

  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
  /* flex: 1; */
`;

const ApplicationBody = styled("div")`
  padding: 16px;
`;
const ApplicationMain = styled(Paper)`
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

  ${({ theme }) => theme.breakpoints.down("md")} {
    margin-left: 0;
    border-radius: 0;
  }
`;
