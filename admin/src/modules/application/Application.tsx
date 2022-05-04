import { useEffect, useState } from "react";

import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import { Box, Paper, Switch, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { css, styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import useSWR, { useSWRConfig } from "swr";

import { determineAppType } from "@helpers/determineAppType";
import { fetcher } from "@helpers/swrFetcher";

import useDatefnsLocalized from "@hooks/useDatefnsLocalized";

import { Loader } from "@components/Loader";
import { SideNav } from "@components/SideNav";
import { SummaryList } from "@components/SummaryList";
import { Tabs } from "@components/Tabs";
import { BackArrow } from "@components/buttons";
import { PageContainer } from "@components/layout";

import { AdminFileInput } from "./AdminFileInput";
import { Attachments } from "./Attachments";
import { ContextMenu } from "./ContextMenu";
import { ControlButtons } from "./ControlButtons";
import { FileBox } from "./FileBox";
import { SetStatus } from "./SetStatus";
import { Status } from "./Status";

const Application = (): JSX.Element => {
  const { t } = useTranslation();
  const { formatDistanceToNow, format } = useDatefnsLocalized();
  const router = useRouter();
  const { id } = router.query;
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));
  // const { mutate } = useSWRConfig();

  const [summaryReady, setSummaryReady] = useState([]);

  const { data, error, mutate } = useSWR(
    `/admin/applications/specific/${id}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      setSummaryReady(determineAppType(data?.applicationType, data));
    }
  }, [data]);

  if (!data && !error) return <Loader />;
  return (
    <PageContainer title="Dashboard.title" dashboard>
      <DashboardInner>
        <ApplicationMain>
          <ApplicationHeader hideBorder={md}>
            {!md && <BackArrow sx={{ mr: "0.5rem" }} />}
            <Typography variant="h6" sx={{ flex: "1" }}>
              {t(`Basic.ApplicationType.${data?.applicationType}`)}
            </Typography>
            <ControlButtons id={data.id} data={data} mutate={mutate} />
          </ApplicationHeader>
          <ApplicationBody>
            <InfoContainer>
              <Cell>
                <Typography
                  className="key"
                  sx={{ typography: { sm: "body1", xs: "body2" } }}
                >
                  {t("ApplicationOpen.AppInfo.name")}
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
                  {t("ApplicationOpen.AppInfo.createdAt")}
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
                  {t("ApplicationOpen.AppInfo.updatedAt")}
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
              header={t("ApplicationOpen.Summary.header")}
              array={summaryReady}
              applicationType={data.applicationType}
            />
            <SetStatus id={data.id} currentStatus={data.status} />
            <Attachments data={data} type="userAttachments" />
            <Attachments data={data} type="adminAttachments" />
            <AdminFileInput id={data.id} userid={data.user_id} />
          </ApplicationBody>
        </ApplicationMain>
      </DashboardInner>
    </PageContainer>
  );
};

export default Application;

const DashboardInner = styled("div")`
  display: flex;
  min-height: 100%;
  flex: 1;
  ${({ theme }) => theme.breakpoints.down("md")} {
    flex-direction: column;
  }
`;
const InfoContainer = styled("div")`
  display: flex;
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

const ApplicationHeader = styled("div")<{ hideBorder: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px 16px;

  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
  /* flex: 1; */

  ${({ hideBorder, theme }) => theme.breakpoints.down("md")} {
    ${(hideBorder) =>
      hideBorder &&
      css`
        border-bottom: none;
      `}
  }
`;

const ApplicationBody = styled("div")`
  padding: 16px;
`;
const ApplicationMain = styled(Paper)`
  display: flex;
  width: auto;
  flex-direction: column;
  overflow: hidden;
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
