import { useEffect, useState } from "react";

import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import { Typography } from "@mui/material";

import { useAuth } from "@context/authContext";

import { Loader } from "@components/Loader";
import { AuthContainer } from "@components/layout";

interface Props {
  mode: "resetPassword" | "verifyEmail";
  oobCode: string | undefined;
}

const ActivateEmail = ({ mode, oobCode }: Props): JSX.Element => {
  const { t } = useTranslation();
  const router = useRouter();

  const { currentUser, emailActionHandler } = useAuth();
  const { isLoggedIn, isActive } = currentUser;

  useEffect(() => {
    const verifyEmailFn = () => {
      emailActionHandler(mode, oobCode!);
    };

    verifyEmailFn();
  }, []);

  useEffect(() => {
    if (isLoggedIn && isActive) {
      router.push("/dashboard/insurance");
    }
  }, [isLoggedIn, isActive, router]);

  return (
    <AuthContainer isLoading={false} title={t("Pages.actions.verifyEmail")}>
      <Typography variant="h4" gutterBottom>
        Verifying email
      </Typography>
      <Loader />
    </AuthContainer>
  );
};

export { ActivateEmail };
