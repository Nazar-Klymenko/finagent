import React from "react";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Page5 from "@modules/survey/insurance-transport/5";

import withAuthForm from "@helpers/withAuthForm";

export default withAuthForm(Page5);

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
