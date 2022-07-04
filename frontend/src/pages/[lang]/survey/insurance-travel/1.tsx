import React from "react";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Page1 from "@modules/survey/insurance-travel/1";

import withAuthForm from "@helpers/withAuthForm";

export default withAuthForm(Page1);

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
