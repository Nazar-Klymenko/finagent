import React from "react";

import { getAllLanguageSlugs, getLanguage } from "@lib/i18n";
import Page1 from "@modules/survey/insurance-health/1";

import withAuthForm from "@helpers/withAuthForm";

export default withAuthForm(Page1);

export async function getStaticPaths() {
  const paths = getAllLanguageSlugs();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const language = getLanguage(params.lang);
  return {
    props: {
      language,
    },
  };
}
