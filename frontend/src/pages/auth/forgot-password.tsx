import React, { useEffect, useState } from "react";

import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";

import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { useAuth } from "@context/authContext";

import { Form } from "@components/Form";
import { Button, FacebookButton } from "@components/buttons";
import { Input, MuiPhoneInput, PasswordInput } from "@components/input";
import { AuthContainer } from "@components/layout";

type FormTypes = {
  email: string;
};
const ForgotPassword: NextPage = (props) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { resetPassword, currentUser } = useAuth(),
    { isLoggedIn, isActive } = currentUser;

  const methods = useForm<FormTypes>({
    mode: "onChange",
    shouldFocusError: true,
    resolver: yupResolver(forgotPasswordSchema()),
  });
  const { handleSubmit } = methods;

  const formSubmit = handleSubmit((data: { email: string }) => {
    resetPassword(data.email);
  });

  useEffect(() => {
    if (isLoggedIn && isActive) {
      router.push("/dashboard/insurance");
    } else if (isLoggedIn && !isActive) {
      router.push("/activate-email");
    }
  }, [isLoggedIn, isActive, router]);

  return (
    <AuthContainer isLoading={false}>
      <Typography gutterBottom align="center" variant="h3">
        {t("RestorePassword.title")}
      </Typography>
      <Typography variant="caption">
        {t("RestorePassword.Form.explain")}
      </Typography>
      <Form methods={methods} id="restore-password" onSubmit={formSubmit}>
        <Input
          name="email"
          labelName={t("RestorePassword.Form.email")}
          type="email"
          autoFocus={false}
          autoComplete="email"
        />
      </Form>
      <Button fullWidth form="form">
        {t("LogIn.Form.button")}
      </Button>
      <AuthOptions>
        {t("RestorePassword.noNeedRestore")}
        <Link href="/auth/login">
          <a>{t("RestorePassword.logIn")}</a>
        </Link>
      </AuthOptions>
      )
    </AuthContainer>
  );
};
export default ForgotPassword;

const AuthOptions = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    font-size: 0.8rem;
    margin: 1rem;
  }
  a {
    color: ${({ theme }) => theme.palette.primary.main};
    padding: 0.5rem;
    &:visited {
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }
`;
export const forgotPasswordSchema = () => {
  return yup.object().shape({
    email: yup
      .string()
      .email("Email should have correct format")
      .required("E-mail can't be blank")
      .trim(),
  });
};
export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
