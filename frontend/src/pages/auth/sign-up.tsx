import React, { useEffect, useState } from "react";

import type { NextPage } from "next";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";

import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { useAuth } from "@context/authContext";

import Form from "@components/Form";
import { Button, FacebookButton } from "@components/buttons";
import { Input, MuiPhoneInput, PasswordInput } from "@components/input";
import { AuthContainer } from "@components/layout";

type FormTypes = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  language: string;
  terms: boolean;
};

const SignUp: NextPage = () => {
  const { t } = useTranslation();
  const { currentUser, signup, loginFacebook } = useAuth();
  const { isLoggedIn, isActive } = currentUser;
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let status = localStorage.getItem("onSignIn");
    if (status === "true") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, []);

  const methods = useForm<FormTypes>({
    defaultValues: { terms: false },
    mode: "onChange",
    resolver: yupResolver(signUpSchema),
    shouldFocusError: true,
  });
  const { handleSubmit } = methods;
  const formSubmit = handleSubmit((data) => {
    // data.language = interfaceLanguage;
    signup(data);
  });

  useEffect(() => {
    if (isLoggedIn && isActive) {
      router.push("/dashboard/insurances/ready/1");
    } else if (isLoggedIn && !isActive) {
      router.push("/verify-email");
    }
  }, [isLoggedIn, isActive, router]);

  const signupWithFacebook = () => {
    loginFacebook();
  };

  return (
    <AuthContainer>
      {!isLoading ? (
        <>
          <Typography gutterBottom align="center" variant="h3">
            {t("SignUp.title")}
          </Typography>

          <Form methods={methods} id="form" onSubmit={formSubmit}>
            <Input
              name="fullName"
              labelName={t("SignUp.Individual.fullName")}
              autoFocus={true}
              autoComplete="name"
            />

            <Input
              name="email"
              labelName={t("SignUp.Individual.email")}
              type="email"
              autoComplete="email"
            />
            <MuiPhoneInput
              name="phone"
              labelName={t("SignUp.Individual.phone")}
              optional
            />
            <PasswordInput
              name="password"
              labelName={t("SignUp.Individual.password")}
              autoComplete="new-password"
            />
          </Form>

          <Button fullWidth form="form">
            {t("SignUp.Form.button")}
          </Button>

          <Typography variant="caption" align="center" gutterBottom>
            Or sign up using other methods
          </Typography>

          <FacebookButton fullWidth onClick={signupWithFacebook}>
            Facebook
          </FacebookButton>

          <AuthOptions>
            <span>
              {t("SignUp.addActions.haveAccount")}
              <Link href="/auth/login">
                <a>{t("SignUp.addActions.logIn")}</a>
              </Link>
            </span>
          </AuthOptions>
        </>
      ) : (
        <CircularProgress />
      )}
    </AuthContainer>
  );
};

export default SignUp;

const AuthOptions = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    font-size: 0.8rem;
    margin: 1rem;
    a {
      color: ${({ theme }) => theme.palette.primary.main};
      padding: 0.5rem;
      &:visited {
        color: ${({ theme }) => theme.palette.primary.main};
      }
    }
  }
`;

const signUpSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email should have correct format")
    .required("Form.Error.blank")
    .trim(),
  password: yup
    .string()
    .required("Form.Error.blank")
    .min(8, "The password has to be at lest 8 symbols"),
  fullName: yup.string().required("Form.Error.blank").trim(),
  phone: yup.string().trim(),
  // terms: yup
  //   .boolean()
  //   .oneOf([true], "Please read and accept the Terms and Conditions"),
});
export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
