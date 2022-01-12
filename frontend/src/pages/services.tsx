import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuth } from "@context/authContext";
import { CardContent, Card, CardActionArea, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "next-i18next";
import React from "react";
import { PageContainer } from "@components/layout";

const Services: NextPage = () => {
  const { t } = useTranslation();

  return (
    <PageContainer title="Pages.services">
      <Typography variant="h3" gutterBottom>
        {t("Services.Titles.insurances")}
      </Typography>
      <ServicesWrap>
        <ServiceCard
          to="quest/transport/1"
          image="images/transport.svg"
          imageAlt=""
          header={t("Services.Transport.title")}
          description={t("Services.Transport.subtitle")}
        />
        <ServiceCard
          to="quest/transport-border/1"
          image="images/border.svg"
          imageAlt=""
          header={t("Services.Border.title")}
          description={t("Services.Border.subtitle")}
        />
        <ServiceCard
          to="quest/reimbursement/1"
          image="images/health_insurance.svg"
          imageAlt=""
          header={t("Services.Health.title")}
          description={t("Services.Health.subtitle")}
        />
        <ServiceCard
          to="quest/diagnostic/1"
          image="images/specialist.svg"
          imageAlt=""
          header={t("Services.Diagnostic.title")}
          description={t("Services.Diagnostic.subtitle")}
        />
        <ServiceCard
          to="quest/travel/1"
          image="images/travel_insurance.svg"
          imageAlt=""
          header={t("Services.Travel.title")}
          description={t("Services.Travel.subtitle")}
        />
        <ServiceCard
          to="quest/estate/1"
          image="images/estate.svg"
          imageAlt=""
          header={t("Services.Estate.title")}
          description={t("Services.Estate.subtitle")}
        />
      </ServicesWrap>
      <Spacer />
      <Typography variant="h3" gutterBottom>
        {t("Services.Titles.loans")}
      </Typography>
      <ServicesWrap>
        <ServiceCard
          to="quest/cashloan/1"
          image="images/loan.svg"
          imageAlt=""
          header={t("Services.Cash.title")}
          description={t("Services.Cash.subtitle")}
        />
        <ServiceCard
          to="quest/mortgage/1"
          image="images/mortgage.svg"
          imageAlt=""
          header={t("Services.Mortgage.title")}
          description={t("Services.Mortgage.subtitle")}
        />
        <Collapsed></Collapsed>
      </ServicesWrap>
    </PageContainer>
  );
};

export default Services;

interface Props {
  to: string;
  image: any;
  imageAlt: string;
  header: string;
  description: string;
}

function ServiceCard({ to, image, imageAlt, header, description }: Props) {
  const router = useRouter();

  function openService(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    router.push(to);
  }
  return (
    <CardActionArea
      onClick={(e) => {
        openService(e);
      }}
      href={to}
    >
      <CardStyled>
        <CardImage src={image} alt={imageAlt} />
        <CardContentStyled>
          <Typography align="left" variant="h6">
            {header}
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </CardContentStyled>
      </CardStyled>
    </CardActionArea>
  );
}

const CardStyled = styled(Card)`
  justify-content: center !important;
  align-items: center !important;
  display: flex !important;
  flex-direction: column !important;
  min-height: 400px;
`;
const CardContentStyled = styled(CardContent)`
  min-height: 200px;
  ${({ theme }) => theme.breakpoints.down("md")} {
    min-height: 150px;
  }
`;

const CardImage = styled("img")`
  height: 180px;
  padding: 24px;
  margin: 0 auto;
`;

const ServicesWrap = styled("div")`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, max-content));
  grid-gap: 48px;
  justify-content: left;

  ${({ theme }) => theme.breakpoints.down("md")} {
    grid-template-columns: repeat(auto-fit, minmax(260px, max-content));
  } ;
`;

const Collapsed = styled("div")`
  visibility: collape;
`;
const Spacer = styled("div")`
  width: 100%;
  height: 32px;
`;
