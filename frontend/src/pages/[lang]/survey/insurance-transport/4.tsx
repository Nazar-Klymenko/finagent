import React from "react";

import { getAllLanguageSlugs, getLanguage } from "@lib/i18n";
import Page4 from "@modules/survey/insurance-transport/4";

import withAuthForm from "@helpers/withAuthForm";

export default withAuthForm(Page4);

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
