import React from "react";

import Border from "@assets/images/border.svg";
import Estate from "@assets/images/estate.svg";
import HealthInsurance from "@assets/images/health_insurance.svg";
import Loan from "@assets/images/loan.svg";
import Mortgage from "@assets/images/mortgage.svg";
import SpecialistInsurance from "@assets/images/specialist.svg";
import Transport from "@assets/images/transport.svg";
import Travel from "@assets/images/travel_insurance.svg";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import useTitle from "@hooks/useTitle";

import { ContentWrap } from "@components/content";
import { Header } from "@components/typography";

import ServiceCard from "./ServiceCard";

const Services = () => {
  useTitle("Services | FinAgent");
  const { t } = useTranslation();
  return (
    <ContentWrap fullWidth direction="column" blank>
      <Header variant="h1" bottomGutter>
        {t("Services.Titles.insurances")}
      </Header>
      <ServicesWrap>
        <ServiceCard
          to="quest/transport/1"
          image={Transport}
          imageAlt=""
          header={t("Services.Transport.title")}
          description={t("Services.Transport.subtitle")}
        />
        <ServiceCard
          to="quest/transport-border/1"
          image={Border}
          imageAlt=""
          header={t("Services.Border.title")}
          description={t("Services.Border.subtitle")}
        />
        <ServiceCard
          to="quest/reimbursement/1"
          image={HealthInsurance}
          imageAlt=""
          header={t("Services.Health.title")}
          description={t("Services.Health.subtitle")}
        />
        <ServiceCard
          to="quest/diagnostic/1"
          image={SpecialistInsurance}
          imageAlt=""
          header={t("Services.Diagnostic.title")}
          description={t("Services.Diagnostic.subtitle")}
        />
        <ServiceCard
          to="quest/travel/1"
          image={Travel}
          imageAlt=""
          header={t("Services.Travel.title")}
          description={t("Services.Travel.subtitle")}
        />
        <ServiceCard
          to="quest/estate/1"
          image={Estate}
          imageAlt=""
          header={t("Services.Estate.title")}
          description={t("Services.Estate.subtitle")}
        />
      </ServicesWrap>

      <Header variant="h1" bottomGutter>
        {t("Services.Titles.loans")}
      </Header>
      <ServicesWrap>
        <ServiceCard
          to="quest/cashloan/1"
          image={Loan}
          imageAlt=""
          header={t("Services.Cash.title")}
          description={t("Services.Cash.subtitle")}
        />
        <ServiceCard
          to="quest/mortgage/1"
          image={Mortgage}
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
