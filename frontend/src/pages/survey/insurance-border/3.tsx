import React from "react";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Page3 from "@modules/survey/insurance-border/3";

import withAuthForm from "@helpers/withAuthForm";

export default withAuthForm(Page3);

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
