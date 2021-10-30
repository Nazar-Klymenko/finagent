import React, { useState } from "react";

import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordSchema } from "./passwordSchema";

import { useTranslation } from "react-i18next";

import { ContentWrap } from "@components/content";
import Form from "@components/Form";
import { MuiInput } from "@components/input";
import { CTA } from "@components/buttons";

import { requestChangePasswordAPI } from "@api/userAPI";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const [isError, setIsError] = useState("");

  const { register, handleSubmit, errors, control } = useForm({
    mode: "onChange",
    reValidateMode: "onBlur",
    shouldFocusError: true,
    resolver: yupResolver(forgotPasswordSchema()),
  });

  const formSubmit = async (data) => {
    try {
      await requestChangePasswordAPI(data);
      alert(t("RestorePassword.confirm"));
    } catch (error) {
      if (error.response?.status === 400) {
        setIsError("Not existing email!");
      }
    }
  };

  return (
    <ContentWrap>
      <div className="forgot-page">
        <h1 className="title">{t("RestorePassword.title")}</h1>
        <div className="form-wrap">
          <Form
            id="form"
            className="input-wrap"
            onSubmit={handleSubmit(formSubmit)}
          >
            <MuiInput
              control={control}
              name="email"
              labelName={t("RestorePassword.Form.email")}
              type="email"
              autofocus={true}
              error={!!errors.email}
              helperText={errors?.email?.message}
            />
          </Form>
          <p>{t("RestorePassword.Form.explain")}</p>
          <div className="button-place">
            <CTA form="form" text={t("RestorePassword.Form.button")} />
          </div>
        </div>
        <div className="auth-option">
          <span>
            {t("RestorePassword.noNeedRestore")}
            <NavLink className="login-link" to="/auth/login">
              {t("RestorePassword.logIn")}
            </NavLink>
          </span>
        </div>
        {isError && (
          <div className="status-error">
            <span>{isError}</span>
          </div>
        )}
      </div>
    </ContentWrap>
  );
};

export default ForgotPassword;
