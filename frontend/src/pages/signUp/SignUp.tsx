import React, { useEffect, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { NavLink, useHistory } from "react-router-dom";

import { useAuth } from "@context/authContext";

import Form from "@components/Form";
import Loader from "@components/Loader";
import { MuiButton } from "@components/buttons";
import { ContentWrap } from "@components/content";
import { MuiInput, MuiPasswordInput, MuiPhoneInput } from "@components/input";

import signUpSchema from "./signUp.schema";

type FormTypes = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  language: string;
  terms: boolean;
};

const SignUp = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { currentUser, signup, loginFacebook } = useAuth();
  const { isLoggedIn, isActive } = currentUser;

  let interfaceLanguage = document.cookie.replace(
    /(?:(?:^|.*;\s*)i18next\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

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
    data.language = interfaceLanguage;
    signup(data);
  });

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

  return !isLoading ? (
    <ContentWrap authForm direction="column">
      <Typography gutterBottom align="center" variant="h3">
        {t("SignUp.title")}
      </Typography>

      <Form methods={methods} id="form" onSubmit={formSubmit}>
        <MuiInput
          name="fullName"
          labelName={t("SignUp.Individual.fullName")}
          autoFocus={true}
          autoComplete="name"
        />

        <MuiInput
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
        <MuiPasswordInput
          name="password"
          labelName={t("SignUp.Individual.password")}
          autoComplete="new-password"
        />
      </Form>

      <MuiButton
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
  ) : (
    <Loader />
  );
};

export default SignUp;

const AuthOptions = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginOtion = styled("div")`
  font-size: 0.8rem;
  margin: 1rem;
  .login-link {
    color: ${({ theme }) => theme.palette.primary.main};
    padding: 0.5rem;
    &:visited {
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }
`;

const FacebookButton = styled("button")`
  cursor: pointer;
  height: 48px;
  background: "#3B5998";
  color: white;
  border-radius: 3px;
  border: none;
  margin: 0.5rem 0;
  font-size: 1rem;
  &:hover {
    opacity: 0.8;
  }
`;

const AlternativeLine = styled("div")`
  color: ${({ theme }) => theme.palette.divider};
  font-size: 0.8rem;
  padding: 0.5rem;
  margin-top: 0.5rem;
  text-align: center;
`;
