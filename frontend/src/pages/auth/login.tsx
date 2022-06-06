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
import { Input, PasswordInput } from "@components/input";
import { AuthContainer } from "@components/layout";

type FormTypes = {
  email: string;
  password: string;
};

const Login: NextPage = (props) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { login, loginFacebook, currentUser } = useAuth();
  const { isLoggedIn, isActive } = currentUser;

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let status = localStorage.getItem("onSignIn");
    setIsLoading(status === "true" ? true : false);
  }, []);

  const methods = useForm<FormTypes>({
    defaultValues: {
      email: "",
      password: "",
    },
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

  const loginWithFacebook = () => {
    loginFacebook();
  };
  useEffect(() => {
    if (isLoggedIn && isActive) {
      router.push("/dashboard/insurance");
    } else if (isLoggedIn && !isActive) {
      router.push("/auth/activate-email");
    }
  }, [isLoggedIn, isActive, router]);

  return (
    <AuthContainer isLoading={isLoading} title={t("LogIn.title")}>
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
              resetLink
            />
          </Form>
          <Button fullWidth form="form">
            {t("LogIn.Form.button")}
          </Button>

          <Typography
            variant="caption"
            align="center"
            gutterBottom
            sx={{ mt: "0.5rem" }}
          >
            {t("LogIn.otherOptions")}
          </Typography>

          <FacebookButton fullWidth onClick={loginWithFacebook}>
            Facebook
          </FacebookButton>

          <AuthOptions>
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
