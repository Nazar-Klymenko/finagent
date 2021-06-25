import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Head from "next/head";

import { useRouter } from "next/router";

import { useTranslation } from "next-i18next";

export default function EstateInsurance() {
  const router = useRouter();
  const { t } = useTranslation();

  const redirectToApp = () => {
    router.push("https://app.finagent.eu");
  };

  return (
    <>
      <Head>
        <title>{t("Services.Cash.title")}</title>
        <meta property="og:title" content="page title" key="title" />
      </Head>
    </>
  );
}
export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale)),
  },
});
