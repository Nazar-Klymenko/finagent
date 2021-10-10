import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components/macro";

import { Input, InputPassword } from "@components/input";
import { ContentWrap } from "@components/content";
import { CTA } from "@components/buttons";
import Form from "@components/Form";
import { Header } from "@components/typography";

import loginSchema from "./login.schema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { login, loginFacebook } from "@redux/auth/actions";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  location: any;
}

const Login: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
    shouldFocusError: true,
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
    if (isLoggedIn) history.push(originalRoute);
  }, [isLoggedIn, history, originalRoute]);

  const redirectCallback = () => {
    history.push("/dashboard/insurances/ready/1");
  };

  const formSubmit = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    dispatch(login(data.email, data.password, redirectCallback));
    setIsLoading(false);
  };

  const loginWithFacebook = () => {
    dispatch(loginFacebook());
  };

  return (
    <ContentWrap xl authForm direction="column">
      <FormWrap>
        <Header bottomGutter variant="h1" align="center">
          {t("LogIn.title")}
        </Header>
        <Form id="form" onSubmit={handleSubmit(formSubmit)}>
          <Input
            ref={register}
            name="email"
            placeholder="E-mail"
            labelName={t("LogIn.Form.email")}
            type="email"
            error={!!errors.email}
            helperText={errors?.email?.message}
            autofocus={true}
          />
          <InputPassword
            ref={register}
            name="password"
            labelName={t("LogIn.Form.password")}
            error={!!errors.password}
            helperText={errors?.password?.message}
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
      </FormWrap>
    </ContentWrap>
  );
};

export default Login;

const FormWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

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

// const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);

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
