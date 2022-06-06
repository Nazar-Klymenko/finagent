import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Image from "next/image";

import { Typography } from "@mui/material";

import withAuth from "@helpers/withAuth";

import { PageContainer } from "@components/layout";

const Notifications: NextPage = () => {
  const { t } = useTranslation();

  return (
    <PageContainer title={t("Pages.notifications")}>
      <Typography variant="h4" textAlign="center">
        Notifications
      </Typography>
    </PageContainer>
  );
};

export default withAuth(Notifications);

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
