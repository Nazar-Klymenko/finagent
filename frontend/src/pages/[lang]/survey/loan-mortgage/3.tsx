import React from "react";

import { getAllLanguageSlugs, getLanguage } from "@lib/i18n";
import Page3 from "@modules/survey/loan-mortgage/3";

import withAuthForm from "@helpers/withAuthForm";

export default withAuthForm(Page3);

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
