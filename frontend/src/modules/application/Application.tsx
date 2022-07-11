import { useRouter } from "next/router";

import { getAllLanguageSlugs, getLanguage } from "@lib/i18n";
import { Box, Paper, Switch, Typography } from "@mui/material";
import { useTheme } from "@mui/material";
import { css, styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import i18next from "i18next";
import useSWR from "swr";

import { determineAppType } from "@helpers/determineAppType";
import { fetcher } from "@helpers/swrFetcher";

import useDatefnsLocalized from "@hooks/useDatefnsLocalized";

import { Loader } from "@components/Loader";
import { SideNav } from "@components/SideNav";
import { SummaryList } from "@components/SummaryList";
import { Tabs } from "@components/Tabs";
import { BackArrow } from "@components/buttons";
import { PageContainer } from "@components/layout";

import { Attachments } from "./Attachments";
import { ContextMenu } from "./ContextMenu";
import { FileBox } from "./FileBox";
import { Status } from "./Status";

const Application = (): JSX.Element => {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useSWR(`/user/applications/specific/${id}`, fetcher);
  const { t } = i18next;
  const { formatDistanceToNow, format } = useDatefnsLocalized();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));
  if (!data && !error) return <Loader />;

  const summaryReady = determineAppType(data?.applicationType, data);

  return (
    <PageContainer title={t("Dashboard.title")} dashboard>
      <DashboardInner>
        {md ? <Tabs links={links} /> : <SideNav links={links} />}
        <ApplicationMain>
          <ApplicationHeader hideBorder={md}>
            {!md && <BackArrow sx={{ mr: "0.5rem" }} />}
            <Typography variant="h6" sx={{ flex: "1" }}>
              {t(`Basic.ApplicationType.${data?.applicationType}`)}
            </Typography>
            <ContextMenu id={id} isArchived={data?.archived} />
          </ApplicationHeader>
          <ApplicationBody>
            <InfoContainer>
              <Cell>
                <Typography
                  className="key"
                  sx={{ typography: { sm: "body1", xs: "body2" } }}
                >
                  {t("Dashboard.ApplicationCard.name")}:
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
                  {t("Dashboard.ApplicationCard.createdAt")}:
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
                  {t("Dashboard.ApplicationCard.updatedAt")}:
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
              array={summaryReady}
              applicationType={data.applicationType}
            />
            <Typography variant="h6">
              {t("ApplicationOpen.Status.title")}
            </Typography>
            <Typography variant="body2">
              {t("ApplicationOpen.Status.subtitle")}
            </Typography>
            <Status currentStep={data.status} />
            <Typography variant="h6">
              {t("ApplicationOpen.Attachments.title")}
            </Typography>
            <Typography variant="body2">
              {t("ApplicationOpen.Attachments.subtitle")}
            </Typography>
            <Attachments type="userAttachments" data={data} />
            <Attachments type="adminAttachments" data={data} />
          </ApplicationBody>
        </ApplicationMain>
      </DashboardInner>
    </PageContainer>
  );
};

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
