import type { NextPage } from "next";

import { getAllLanguageSlugs, getLanguage } from "@lib/i18n";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import i18next from "i18next";

import { ServiceCard } from "@components/ServiceCard";
import { PageContainer } from "@components/layout";

const Services: NextPage = () => {
  const { t } = i18next;

  return (
    <PageContainer title={t("Pages.services")}>
      <Typography variant="h4" gutterBottom>
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
      <Typography variant="h4" gutterBottom>
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
  );
};

export default Services;

const ServicesWrap = styled("div")`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  grid-gap: 48px;
  justify-content: left;

  ${({ theme }) => theme.breakpoints.down("md")} {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  } ;
`;

const Collapsed = styled("div")`
  visibility: collape;
`;
const Spacer = styled("div")`
  width: 100%;
  height: 32px;
`;

const insurances = [
  {
    to: "survey/insurance-transport/1",
    image: "/images/transport.svg",
    description: "Services.Transport.subtitle",
    header: "Services.Transport.title",
  },
  {
    to: "survey/insurance-border/1",
    image: "/images/border.svg",
    description: "Services.Border.subtitle",
    header: "Services.Border.title",
  },
  {
    to: "survey/insurance-health/1",
    image: "/images/health_insurance.svg",
    description: "Services.Health.subtitle",
    header: "Services.Health.title",
  },
  {
    to: "survey/insurance-specialist/1",
    image: "/images/specialist.svg",
    description: "Services.Diagnostic.subtitle",
    header: "Services.Diagnostic.title",
  },
  {
    to: "survey/insurance-travel/1",
    image: "/images/travel_insurance.svg",
    description: "Services.Travel.subtitle",
    header: "Services.Travel.title",
  },
  {
    to: "survey/insurance-estate/1",
    image: "/images/estate.svg",
    description: "Services.Estate.subtitle",
    header: "Services.Estate.title",
  },
];
const loans = [
  {
    to: "survey/loan-cash/1",
    image: "/images/loan.svg",
    description: "Services.Cash.subtitle",
    header: "Services.Cash.title",
  },
  {
    to: "survey/loan-mortgage/1",
    image: "/images/mortgage.svg",
    description: "Services.Mortgage.subtitle",
    header: "Services.Mortgage.title",
  },
];

export async function getStaticPaths() {
  const paths = getAllLanguageSlugs();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const language = getLanguage(params.lang);
  return {
    props: {
      language,
    },
  };
}
