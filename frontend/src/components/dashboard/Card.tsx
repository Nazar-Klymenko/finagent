import { useTranslation } from "next-i18next";
import Link from "next/link";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { IconButton, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import useDatefnsLocalized from "@hooks/useDatefnsLocalized";

const Card = ({ app }: any): JSX.Element => {
  console.log(app);
  const { t } = useTranslation();

  const { formatDistanceToNow, format } = useDatefnsLocalized();
  return (
    <Link href={`application/${app.id}`} passHref>
      <a>
        <CardContainer>
          <StatusColor />
          <CardHeader>
            <Typography variant="h6" sx={{ flex: "1" }}>
              {t("Basic.ApplicationType." + app?.type)}
            </Typography>
            <a
              target="_blank"
              href={`application/${app.id}`}
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <IconButton>
                <OpenInNewIcon />
              </IconButton>
            </a>
          </CardHeader>

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
                {app.user?.fullName}
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
                {format(new Date(app.createdAt))}
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
                {formatDistanceToNow(new Date(app.updatedAt))}
              </Typography>
            </Cell>
            <Cell>
              <Typography
                className="key"
                sx={{ typography: { sm: "body1", xs: "body2" } }}
              >
                {t("Dashboard.ApplicationCard.status")}
              </Typography>
              <Typography
                className="value"
                sx={{ typography: { sm: "body1", xs: "body2" } }}
              >
                {app?.status}/5
              </Typography>
            </Cell>
          </InfoContainer>
        </CardContainer>
      </a>
    </Link>
  );
};

export default Card;

const CardContainer = styled("div")`
  width: 100%;
  height: auto;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  margin-top: 16px;
  padding: 16px 16px 16px 24px;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardHeader = styled("div")`
  display: flex;
  flex: 1;
`;
const InfoContainer = styled("div")`
  display: flex;
  padding-top: 12px;
  ${({ theme }) => theme.breakpoints.down("md")} {
    flex-direction: column;
  }
`;
const StatusColor = styled("div")`
  position: absolute;
  left: 0;
  top: 0;
  width: 0.5rem;
  height: 100%;
  background: ${({ theme }) => theme.palette.primary.main};
  border-radius: 4px 0px 0px 4px;
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
