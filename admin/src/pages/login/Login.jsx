import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

import loginSchema from "./login.schema";

import { Input, InputPassword } from "@components/input";
import { ContentWrap } from "@components/content";
import { CTA } from "@components/buttons";
import Form from "@components/Form";
import { Header } from "@components/typography";
import { login } from "@redux/auth/actions";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";

const Login = (props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    resolver: yupResolver(loginSchema),
    shouldFocusError: true,
  });

  const redirectCallback = () => {
    history.push("/applications/all");
  };

  const formSubmit = async (data) => {
    setIsLoading(true);
    dispatch(login(data.email, data.password, redirectCallback));
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoggedIn) history.push("/applications/all");
  }, [isLoggedIn, history]);

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
