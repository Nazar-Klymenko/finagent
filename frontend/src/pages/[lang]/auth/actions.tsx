import React, { useEffect } from "react";

import type { NextPage } from "next";
import { useRouter } from "next/router";

import { getAllLanguageSlugs, getLanguage } from "@lib/i18n";
import ActionsPage from "@modules/auth/actions";
import { Typography } from "@mui/material";
import i18next from "i18next";

import { useAuth } from "@context/authContext";

import { PageContainer } from "@components/layout";

export default ActionsPage;

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
