import React from "react";

import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { getAllLanguageSlugs, getLanguage } from "@lib/i18n";
import { Typography } from "@mui/material";
import i18next from "i18next";

import { PageContainer } from "@components/layout";

const Privacy: NextPage = () => {
  const { t } = i18next;

  return (
    <PageContainer title={t("Privacy policy")}>
      <Typography variant="h4" gutterBottom>
        {/* {t("Contact.title")} */}
        Privacy policy
      </Typography>
    </PageContainer>
  );
};

export default Privacy;

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
