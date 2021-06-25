import React from "react";
import Head from "next/head";

import { useTranslation } from "next-i18next";

export default function Services() {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title> {t("Services.Titles.insurances")}</title>
        <meta property="og:title" content="page title" key="title" />
      </Head>
    </>
  );
}
