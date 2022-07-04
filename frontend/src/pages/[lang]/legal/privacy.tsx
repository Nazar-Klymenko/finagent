import React from "react";

import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Image from "next/image";

import { Typography } from "@mui/material";

import { PageContainer } from "@components/layout";

const Privacy: NextPage = () => {
  const { t } = useTranslation();

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

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
