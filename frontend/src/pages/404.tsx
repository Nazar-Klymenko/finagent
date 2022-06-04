import React from "react";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";

import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import { PageContainer } from "@components/layout";

const Error404 = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <PageContainer title={"404"}>
      <Container>
        <Typography variant="h4" color="primary">
          404
        </Typography>
        <Typography>{t("404.title")}</Typography>
        <Link href="/">
          <a> {t("404.link")}</a>
        </Link>
      </Container>
    </PageContainer>
  );
};
export default Error404;

const Container = styled("div")`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  margin: 20vh auto;
  a {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;
export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
