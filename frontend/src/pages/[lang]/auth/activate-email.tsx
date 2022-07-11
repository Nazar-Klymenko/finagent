import React, { useEffect } from "react";

import type { NextPage } from "next";
import { useRouter } from "next/router";

import { getAllLanguageSlugs, getLanguage } from "@lib/i18n";
import { Typography } from "@mui/material";
import i18next from "i18next";

import { useAuth } from "@context/authContext";

import { PageContainer } from "@components/layout";

const VerifyEmailPage: NextPage = () => {
  const { t } = i18next;
  const router = useRouter();
  const { currentUser, resendVerificationEmail } = useAuth();
  const { isLoggedIn, isActive } = currentUser;

  const resendEmail = () => {
    resendVerificationEmail();
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/auth/login");
    } else if (isLoggedIn && isActive) {
      router.push("/dashboard");
    }
  }, [isLoggedIn, isActive, router]);

  return (
    <PageContainer title={t("ActivateEmail.title")}>
      <Typography variant="h4">{t("ActivateEmail.content")}</Typography>
      <Typography
        variant="h6"
        color="primary"
        sx={{ cursor: "pointer" }}
        onClick={resendEmail}
      >
        {t("ActivateEmail.resend")}
      </Typography>
    </PageContainer>
  );
};

export default VerifyEmailPage;

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
