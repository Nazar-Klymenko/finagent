import React from "react";
import useTitle from "@hooks/useTitle";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { FullPage } from "@components/content";

import ServiceCard from "./ServiceCard";

const Services = () => {
  useTitle("Services | FinAgent");
  const { t } = useTranslation();
  return (
    <FullPage>
      <ServicesHeader>{t("Services.Titles.insurances")}</ServicesHeader>
      <ServicesWrap>
        <ServiceCard
          to="quest/transport/1"
          image={process.env.PUBLIC_URL + "/images/car.png"}
          imageAlt=""
          header={t("Services.Transport.title")}
          description={t("Services.Transport.subtitle")}
        />
        <ServiceCard
          to="quest/transport-border/1"
          image={process.env.PUBLIC_URL + "/images/car.png"}
          imageAlt=""
          header={t("Services.Border.title")}
          description={t("Services.Border.subtitle")}
        />
        <ServiceCard
          to="quest/reimbursement/1"
          image={process.env.PUBLIC_URL + "/images/health.png"}
          imageAlt=""
          header={t("Services.Health.title")}
          description={t("Services.Health.subtitle")}
        />
        <ServiceCard
          to="quest/diagnostic/1"
          image={process.env.PUBLIC_URL + "/images/tablet.png"}
          imageAlt=""
          header={t("Services.Diagnostic.title")}
          description={t("Services.Diagnostic.subtitle")}
        />
        <ServiceCard
          to="quest/travel/1"
          image={process.env.PUBLIC_URL + "/images/greencards.png"}
          imageAlt=""
          header={t("Services.Travel.title")}
          description={t("Services.Travel.subtitle")}
        />
        <ServiceCard
          to="quest/estate/1"
          image={process.env.PUBLIC_URL + "/images/maincards.png"}
          imageAlt=""
          header={t("Services.Estate.title")}
          description={t("Services.Estate.subtitle")}
        />
      </ServicesWrap>

      <ServicesHeader>{t("Services.Titles.loans")}</ServicesHeader>
      <ServicesWrap>
        <ServiceCard
          to="quest/cashloan/1"
          image={process.env.PUBLIC_URL + "/images/maincards.png"}
          imageAlt=""
          header={t("Services.Cash.title")}
          description={t("Services.Cash.subtitle")}
        />
        <ServiceCard
          to="quest/mortgage/1"
          image={process.env.PUBLIC_URL + "/images/greencards.png"}
          imageAlt=""
          header={t("Services.Mortgage.title")}
          description={t("Services.Mortgage.subtitle")}
        />
      </ServicesWrap>
    </FullPage>
  );
};

export default Services;

const ServicesHeader = styled.div`
  font-size: 1.8rem;
  font-weight: 500;
  padding: 48px 0px 32px;
  text-align: center;
`;

const ServicesWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, max-content));
  grid-gap: 64px;
  justify-content: center;
`;
