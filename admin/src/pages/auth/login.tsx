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
import { Button } from "@components/buttons";
import { Input, PasswordInput } from "@components/input";
import { AuthContainer } from "@components/layout";

type FormTypes = {
  email: string;
  password: string;
};

const Login: NextPage = (props) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { login, currentUser } = useAuth();
  const { isLoggedIn, isActive } = currentUser;

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
    mode: "onChange",
    shouldFocusError: true,
    resolver: yupResolver(loginSchema),
  });
  const { handleSubmit } = methods;

  const formSubmit = handleSubmit(
    (data: { email: string; password: string }) => {
      login(data.email, data.password);
    }
  );

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  return (
    <AuthContainer isLoading={isLoading}>
      {!isLoading ? (
        <>
          <Typography gutterBottom align="center" variant="h4">
            {t("LogIn.title")}
          </Typography>
          <Form methods={methods} id="form" onSubmit={formSubmit}>
            <Input
              name="email"
              labelName={t("LogIn.Form.email")}
              type="email"
              autoFocus={false}
              autoComplete="email"
            />
            <PasswordInput
              name="password"
              labelName={t("LogIn.Form.password")}
              autoComplete="current-password"
            />
          </Form>
          <Button fullWidth form="form">
            {t("LogIn.Form.button")}
          </Button>

          <AuthOptions>
            <Link href="/auth/forgot-password">
              <a>{t("LogIn.addActions.forgot")}</a>
            </Link>
            <span>
              {t("LogIn.addActions.noAccount")}
              <Link href="/auth/sign-up">
                <a>{t("LogIn.addActions.signUp")}</a>
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

export default Login;

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

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required("E-mail can't be blank")
    .matches(/\S+@\S+\.\S+/, "Incorrect mail format")
    .trim(),
  password: yup.string().required("Password can't be blank"),
});
export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
