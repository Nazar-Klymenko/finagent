import React from "react";

import { getAllLanguageSlugs, getLanguage } from "@lib/i18n";
import Summary from "@modules/survey/insurance-estate/summary";

import withAuthForm from "@helpers/withAuthForm";

export default withAuthForm(Summary);

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
