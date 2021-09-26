import React from "react";
import useTitle from "@hooks/useTitle";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { FullPage, ContentWrap } from "@components/content";
import { Header } from "@components/typography";

import ServiceCard from "./ServiceCard";

const Services = () => {
  useTitle("Services | FinAgent");
  const { t } = useTranslation();
  return (
    <ContentWrap fullWidth direction="column" blank P0>
      <Header bottomGutter>{t("Services.Titles.insurances")}</Header>
      <ServicesWrap>
        <ServiceCard
          to="quest/transport/1"
          image={process.env.PUBLIC_URL + "/images/transport.svg"}
          imageAlt=""
          header={t("Services.Transport.title")}
          description={t("Services.Transport.subtitle")}
        />
        <ServiceCard
          to="quest/transport-border/1"
          image={process.env.PUBLIC_URL + "/images/border.svg"}
          imageAlt=""
          header={t("Services.Border.title")}
          description={t("Services.Border.subtitle")}
        />
        <ServiceCard
          to="quest/reimbursement/1"
          image={process.env.PUBLIC_URL + "/images/health_insurance.svg"}
          imageAlt=""
          header={t("Services.Health.title")}
          description={t("Services.Health.subtitle")}
        />
        <ServiceCard
          to="quest/diagnostic/1"
          image={process.env.PUBLIC_URL + "/images/specialist.svg"}
          imageAlt=""
          header={t("Services.Diagnostic.title")}
          description={t("Services.Diagnostic.subtitle")}
        />
        <ServiceCard
          to="quest/travel/1"
          image={process.env.PUBLIC_URL + "/images/travel_insurance.svg"}
          imageAlt=""
          header={t("Services.Travel.title")}
          description={t("Services.Travel.subtitle")}
        />
        <ServiceCard
          to="quest/estate/1"
          image={process.env.PUBLIC_URL + "/images/estate.svg"}
          imageAlt=""
          header={t("Services.Estate.title")}
          description={t("Services.Estate.subtitle")}
        />
      </ServicesWrap>

      <Header bottomGutter>{t("Services.Titles.loans")}</Header>
      <ServicesWrap>
        <ServiceCard
          to="quest/cashloan/1"
          image={process.env.PUBLIC_URL + "/images/loan.svg"}
          imageAlt=""
          header={t("Services.Cash.title")}
          description={t("Services.Cash.subtitle")}
        />
        <ServiceCard
          to="quest/mortgage/1"
          image={process.env.PUBLIC_URL + "/images/mortgage.svg"}
          imageAlt=""
          header={t("Services.Mortgage.title")}
          description={t("Services.Mortgage.subtitle")}
        />
      </ServicesWrap>
    </ContentWrap>
  );
};

export default Services;

const ServicesWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, max-content));
  grid-gap: 48px;
  justify-content: left;
  padding-bottom: 32px;
`;
