import React from "react";

import type { NextPage } from "next";
import { useTranslation } from "next-i18next";

import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { PageContainer } from "@components/layout";

import ServiceCard from "./ServiceCard";
import { insurances, loans } from "./config";

const Services: NextPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Typography variant="h3" gutterBottom>
        {t("Services.Titles.insurances")}
      </Typography>
      <PageContainer title="Pages.services">
        <Typography variant="h3" gutterBottom>
          {t("Services.Titles.insurances")}
        </Typography>
        <ServicesWrap>
          {insurances.map((card, idx) => (
            <ServiceCard
              key={idx}
              to={card.to}
              image={card.image}
              header={t(card.header)}
              description={t(card.description)}
            />
          ))}
        </ServicesWrap>
        <Spacer />
        <Typography variant="h3" gutterBottom>
          {t("Services.Titles.loans")}
        </Typography>
        <ServicesWrap>
          {loans.map((card, idx) => (
            <ServiceCard
              key={idx}
              to={card.to}
              image={card.image}
              header={t(card.header)}
              description={t(card.description)}
            />
          ))}
          <Collapsed />
        </ServicesWrap>
      </PageContainer>
    </>
  );
};

export default Services;

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
