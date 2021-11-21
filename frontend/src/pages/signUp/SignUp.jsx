import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import signUpSchema from "./signUp.schema";

import { ContentWrap } from "@components/content";
import { MuiInput, MuiPhoneInput, MuiPasswordInput } from "@components/input";
import { CTA } from "@components/buttons";
import Form from "@components/Form";
import { Header } from "@components/typography";

import { useAuth } from "@context/authContext";

const SignUp = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { currentUser, signup, loginFacebook } = useAuth();
  const { isLoggedIn, isActive } = currentUser;
  const [isLoading, setIsLoading] = useState(false);

  let interfaceLanguage = document.cookie.replace(
    /(?:(?:^|.*;\s*)i18next\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { terms: false },
    mode: "onChange",
    resolver: yupResolver(signUpSchema),
    shouldFocusError: true,
  });

  const formSubmit = async (data) => {
    data.language = interfaceLanguage;
    setIsLoading(true);
    signup(data);
  };

  useEffect(() => {
    if (isLoggedIn && isActive) {
      history.push("/dashboard/insurances/ready/1");
    } else if (isLoggedIn && !isActive) {
      history.push("/verify-email");
    }
  }, [isLoggedIn, isActive, history]);

  const signupWithFacebook = () => {
    loginFacebook();
  };

  return (
    <ContentWrap xl authForm direction="column">
      <Header align="center" bottomGutter variant="h1">
        {t("SignUp.title")}
      </Header>
      <Form id="form" onSubmit={handleSubmit(formSubmit)}>
        <MuiInput
          control={control}
          name="fullName"
          labelName={t("SignUp.Individual.fullName")}
          error={!!errors.fullName}
          helperText={errors?.fullName?.message}
          autoFocus={true}
          autoComplete="name"
        />

        <MuiInput
          control={control}
          name="email"
          labelName={t("SignUp.Individual.email")}
          type="email"
          error={!!errors.email}
          helperText={errors?.email?.message}
          autoComplete="email"
        />
        <MuiPhoneInput
          control={control}
          name="phone"
          labelName={t("SignUp.Individual.phone")}
          error={!!errors.phone}
          helperText={errors?.phone?.message}
          optional
          autoComplete="tel"
        />
        <MuiPasswordInput
          control={control}
          name="password"
          labelName={t("SignUp.Individual.password")}
          error={!!errors.password}
          helperText={t(errors?.password?.message)}
          autoComplete="new-password"
        />
      </Form>

      <CTA
        isLoading={isLoading}
        text={t("SignUp.Form.button")}
        form="form"
        color="primary"
        large
      />

      <AlternativeLine>Or sign up using other methods</AlternativeLine>
      <FacebookButton onClick={signupWithFacebook}>Facebook</FacebookButton>

      <AuthOptions>
        <LoginOtion>
          {t("SignUp.addActions.haveAccount")}
          <NavLink className="login-link" to="/auth/login">
            {t("SignUp.addActions.logIn")}
          </NavLink>
        </LoginOtion>
      </AuthOptions>
    </ContentWrap>
  );
};

export default SignUp;

const AuthOptions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginOtion = styled.div`
  font-size: 0.8rem;
  margin: 1rem;
  .login-link {
    color: ${({ theme }) => theme.typography.blue};
    padding: 0.5rem;
    &:visited {
      color: ${({ theme }) => theme.typography.blue};
    }
  }
`;

const FacebookButton = styled.button`
  cursor: pointer;
  height: 48px;
  background: ${({ theme }) => theme.buttons.facebook};
  color: white;
  border-radius: 3px;
  border: none;
  margin: 0.5rem 0;
  &:hover {
    opacity: 0.8;
  }
  /* min-height */
`;

const AlternativeLine = styled.div`
  color: ${({ theme }) => theme.gray};
  font-size: 0.8rem;
  padding: 0.5rem;
  margin-top: 0.5rem;
  text-align: center;
`;
