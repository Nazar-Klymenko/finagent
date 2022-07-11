import React, { useState } from "react";

import { getAllLanguageSlugs, getLanguage } from "@lib/i18n";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import i18next from "i18next";

import Link from "@components/LinkComponent";
import { PageContainer } from "@components/layout";

const Error404 = (): JSX.Element => {
  const { t } = i18next;
  return (
    <PageContainer title={"404"}>
      <Container>
        <Typography variant="h1" color="primary">
          404
        </Typography>
        <Typography variant="h4">{t("404.title")}</Typography>
        <Link href="/" passHref>
          <Typography component="a" variant="h6">
            {t("404.link")}
          </Typography>
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
