import React, { useEffect, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { NavLink, useHistory } from "react-router-dom";
import styled from "styled-components/macro";

import { useAuth } from "@context/authContext";

import Form from "@components/Form";
import Loader from "@components/Loader";
import { CTA } from "@components/buttons";
import { ContentWrap } from "@components/content";
import { MuiInput, MuiPasswordInput } from "@components/input";
import { Header } from "@components/typography";

import loginSchema from "./login.schema";

interface Props {
  location: any;
}

const Login: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const history = useHistory();
  const { login, loginFacebook, currentUser } = useAuth();
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

  const {
    handleSubmit,
    control,

    formState: { errors },
  } = useForm({
    mode: "onChange",
    shouldFocusError: true,
    resolver: yupResolver(loginSchema),
  });

  const [originalRoute, setOriginalRoute] = useState(
    "/dashboard/insurances/ready/1"
  );

  useEffect(() => {
    if (props.location.state) {
      setOriginalRoute(props.location.state.from.pathname);
    }
    return () => {
      setOriginalRoute("/dashboard/insurances/ready/1");
    };
  }, [props.location.state]);

  useEffect(() => {
    localStorage.setItem("onSignIn", "false");
    if (isLoggedIn && isActive) {
      history.push(originalRoute);
    } else if (isLoggedIn && !isActive) {
      history.push("/verify-email");
    }
  }, [isLoggedIn, isActive, history, originalRoute]);

  const formSubmit = async (data: { email: string; password: string }) => {
    login(data.email, data.password);
  };

  const loginWithFacebook = () => {
    loginFacebook();
  };

  return !isLoading ? (
    <ContentWrap xl authForm direction="column">
      <Header bottomGutter variant="h1" align="center">
        {t("LogIn.title")}
      </Header>
      <Form id="form" onSubmit={handleSubmit(formSubmit)}>
        <MuiInput
          control={control}
          name="email"
          // placeholder="E-mail"
          labelName={t("LogIn.Form.email")}
          type="email"
          error={!!errors.email}
          helperText={t(errors?.email?.message)}
          autoFocus={false}
          autoComplete="email"
        />
        <MuiPasswordInput
          control={control}
          name="password"
          labelName={t("LogIn.Form.password")}
          error={!!errors.password}
          helperText={errors?.password?.message}
          autoComplete="current-password"
        />
      </Form>
      <CTA
        isLoading={isLoading}
        text={t("LogIn.Form.button")}
        form="form"
        color="primary"
        large
      />
      <AlternativeLine>Or log in using other methods</AlternativeLine>
      <FacebookButton onClick={loginWithFacebook}>Facebook</FacebookButton>
      <AuthOptions>
        <NavLink className="forgot-link" to="/auth/forgot-password">
          {t("LogIn.addActions.forgot")}
        </NavLink>
        <SignUpOption>
          {t("LogIn.addActions.noAccount")}
          <NavLink className="signup-link" to="/auth/signup">
            {t("LogIn.addActions.signUp")}
          </NavLink>
        </SignUpOption>
      </AuthOptions>
    </ContentWrap>
  ) : (
    <Loader />
  );
};

export default Login;

const AuthOptions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .forgot-link {
    font-size: 0.8rem;
    margin: 1rem;
    text-decoration: none;
  }
`;

const SignUpOption = styled.div`
  font-size: 0.8rem;
  .signup-link {
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
  font-size: 1rem;
  &:hover {
    opacity: 0.8;
  }
`;

const AlternativeLine = styled.div`
  color: ${({ theme }) => theme.gray};
  font-size: 0.8rem;
  padding: 0.5rem;
  margin-top: 0.5rem;
  text-align: center;
`;

// useEffect(() => {
//   if (isLoggedIn) history.push("/dashboard/insurances");
// }, [isLoggedIn, history]);

// const [originalRoute, setOriginalRoute] = useState("/dashboard/insurances");

// useEffect(() => {
//   if (props.location.state) {
//     setOriginalRoute(props.location.state.from.pathname);
//   }
//   return () => {
//     setOriginalRoute("/dashboard/insurances");
//   };
// }, [props.location.state]);

// useEffect(() => {
//   if (!isSendingRequest && isAuthenticated && !isLoading) {
//     history.push("/dashboard/insurances");
//   }
// }, [isSendingRequest, isAuthenticated, isLoading, history]);
