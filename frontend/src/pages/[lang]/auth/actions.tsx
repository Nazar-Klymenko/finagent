import React, { useEffect } from "react";

import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

import ActionsPage from "@modules/auth/actions";
import { Typography } from "@mui/material";

import { useAuth } from "@context/authContext";

import { PageContainer } from "@components/layout";

export default ActionsPage;

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
