import React, { useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";

import signUpSchema from "./signUp.schema";

import { Input, InputPassword, PhoneInput } from "@components/input";
import { ContentWrap } from "@components/content";
import { CTA } from "@components/buttons";
import Form from "@components/Form";

import { signup } from "@redux/auth/actions";
import { useDispatch, useSelector } from "react-redux";

const SignUp = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: true,
    resolver: yupResolver(signUpSchema),
  });

  const redirectCallback = () => {
    history.push("/dashboard/insurances");
  };

  const formSubmit = async (data) => {
    setIsLoading(true);
    dispatch(signup(data, redirectCallback));
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoggedIn) history.push("/dashboard/insurances");
  }, [isLoggedIn, history]);

  return (
    <ContentWrap>
      <div className="signup-wrap">
        <h1 className="title">{t("SignUp.title")}</h1>

        <Form
          id="form-signup"
          className="input-wrap"
          onSubmit={handleSubmit(formSubmit)}
        >
          <Input
            ref={register}
            name="name"
            labelName={t("SignUp.Form.name")}
            error={!!errors.name}
            helperText={errors?.name?.message}
            autofocus={true}
            autoComplete="given-name"
          />
          <Input
            ref={register}
            name="surname"
            labelName={t("SignUp.Form.surname")}
            error={!!errors.surname}
            helperText={errors?.surname?.message}
            autoComplete="family-name"
          />
          <Input
            ref={register}
            name="email"
            labelName={t("SignUp.Form.email")}
            type="email"
            error={!!errors.email}
            helperText={errors?.email?.message}
          />

          <PhoneInput
            ref={register}
            name="phone"
            labelName={t("SignUp.Form.phone")}
            type="tel"
            error={!!errors.phone}
            helperText={errors?.phone?.message}
          />
          <InputPassword
            ref={register}
            name="password"
            labelName={t("SignUp.Form.password")}
            error={!!errors.password}
            helperText={errors?.password?.message}
          />
          <Input
            ref={register}
            name="secret"
            labelName={t("SignUp.Form.secret")}
            type="text"
            error={!!errors.secret}
            helperText={errors?.secret?.message}
          />
        </Form>
        <CTA
          isLoading={isLoading}
          text={t("SignUp.Form.button")}
          form="form-signup"
          large
        />
        <div className="auth-options">
          <span className="login-link-wrap">
            {t("SignUp.addActions.haveAccount")}
            <NavLink className="login-link" to="/admin/login">
              {t("SignUp.addActions.logIn")}
            </NavLink>
          </span>
        </div>
      </div>
    </ContentWrap>
  );
};

export default SignUp;
