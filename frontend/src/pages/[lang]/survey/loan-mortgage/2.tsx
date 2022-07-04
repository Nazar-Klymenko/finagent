import React from "react";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Page2 from "@modules/survey/loan-mortgage/2";

import withAuthForm from "@helpers/withAuthForm";

export default withAuthForm(Page2);

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
