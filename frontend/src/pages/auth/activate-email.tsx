import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Typography } from "@mui/material";

import { useAuth } from "@context/authContext";

import { PageContainer } from "@components/layout";

const VerifyEmailPage: NextPage = () => {
  const { t } = useTranslation();

  const { resendVerificationEmail } = useAuth();

  const resendEmail = () => {
    resendVerificationEmail();
  };

  return (
    <PageContainer title="ActivateEmail.title">
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

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
