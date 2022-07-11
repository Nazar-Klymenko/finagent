import React, { useEffect, useState } from "react";

import type { NextPage } from "next";
import { useRouter } from "next/router";

import { getAllLanguageSlugs, getLanguage } from "@lib/i18n";
import i18next from "i18next";

import { useAuth } from "@context/authContext";

import { Form } from "@components/Form";
import { Loader } from "@components/Loader";
import { AuthContainer, PageContainer } from "@components/layout";

import { ActivateEmail } from "./actionHelpers/ActivateEmail";
import { ResetPassword } from "./actionHelpers/ResetPassword";

const ActionsPage: NextPage = (props) => {
  const { t } = i18next;
  const router = useRouter();
  const { mode, oobCode, apiKey, continueUrl, lang } = router.query;
  const { currentUser } = useAuth();
  const { isLoggedIn, isActive } = currentUser;

  useEffect(() => {
    if (isLoggedIn && isActive) {
      router.push("/dashboard/insurance");
    }
  }, [isLoggedIn, isActive, router]);

  switch (mode) {
    case "verifyEmail":
      return <ActivateEmail mode={mode} oobCode={oobCode as string} />;
    case "resetPassword":
      return <ResetPassword mode={mode} oobCode={oobCode as string} />;
    default:
      return (
        <AuthContainer isLoading={false} title={""}>
          <Loader />
        </AuthContainer>
      );
  }
};

export default ActionsPage;
