import React from "react";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Summary from "@modules/survey/insurance-transport/summary";

import withAuthForm from "@helpers/withAuthForm";

export default withAuthForm(Summary);

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
