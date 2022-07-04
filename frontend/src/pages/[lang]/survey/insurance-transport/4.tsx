import React from "react";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Page4 from "@modules/survey/insurance-transport/4";

import withAuthForm from "@helpers/withAuthForm";

export default withAuthForm(Page4);

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
