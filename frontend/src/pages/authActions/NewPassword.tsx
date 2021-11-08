import React, { useState } from "react";
import { useHistory, NavLink, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { newPasswordSchema } from "./passwordSchema";

import { useTranslation } from "react-i18next";

import { ContentWrap } from "@components/content";
import Form from "@components/Form";
import { InputPassword } from "@components/input";
import { CTA } from "@components/buttons";

import { confirmChangePasswordAPI } from "@api/userAPI";

const NewPassword = () => {
  const { t } = useTranslation();
  const history = useHistory();
  // let { token } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
    reValidateMode: "onBlur",
    shouldFocusError: true,
    resolver: yupResolver(newPasswordSchema()),
  });

  const formSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      // await confirmChangePasswordAPI(token, data);
      alert(t("NewPassword.confirm"));
      setIsLoading(false);
      history.push("/auth/login");
    } catch (error) {
      setIsError("Couldn't update password");
      setIsLoading(false);
    }
  };

  return (
    <ContentWrap>
      <div className="forgot-page">
        <h1 className="title">{t("NewPassword.title")}</h1>
        <div className="form-wrap">
          <Form id="form" onSubmit={handleSubmit(formSubmit)}>
            <InputPassword
              ref={register}
              name="password"
              labelName={t("NewPassword.Form.password")}
              // autofocus={true}
              error={!!errors.password}
              helperText={errors?.password?.message}
            />

            <InputPassword
              ref={register}
              name="confirmPassword"
              labelName={t("NewPassword.Form.confirmPassword")}
              // type="password"
              // autofocus={true}
              error={!!errors.confirmPassword}
              helperText={errors?.confirmPassword?.message}
            />
          </Form>
          <div className="button-place">
            <CTA
              isLoading={isLoading}
              form="form"
              text={t("NewPassword.Form.button")}
              color="primary"
            />
          </div>
        </div>
        <div className="auth-option">
          <span>
            {t("NewPassword.noNeedRestore")}
            <NavLink className="login-link" to="/auth/login">
              {t("NewPassword.logIn")}
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

export default NewPassword;
