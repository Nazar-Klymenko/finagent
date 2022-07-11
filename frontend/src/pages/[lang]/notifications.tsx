import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { getAllLanguageSlugs, getLanguage } from "@lib/i18n";
import { Typography } from "@mui/material";
import i18next from "i18next";

import withAuth from "@helpers/withAuth";

import { PageContainer } from "@components/layout";

const Notifications: NextPage = () => {
  const { t } = i18next;

  return (
    <PageContainer title={t("Pages.notifications")}>
      <Typography variant="h4" textAlign="center">
        Notifications
      </Typography>
    </PageContainer>
  );
};

export default withAuth(Notifications);

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
