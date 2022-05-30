import React, { useEffect } from "react";

import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

import { Typography } from "@mui/material";

import { useAuth } from "@context/authContext";

import { PageContainer } from "@components/layout";

const VerifyEmailPage: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { mode, oobCode, apiKey, continueUrl, lang } = router.query;

  const { currentUser, resendVerificationEmail } = useAuth();
  const { isLoggedIn, isActive } = currentUser;

  const resendEmail = () => {
    resendVerificationEmail();
  };

  console.log({ mode, oobCode, apiKey, continueUrl, lang });

  return (
    <PageContainer title="actions">
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

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}