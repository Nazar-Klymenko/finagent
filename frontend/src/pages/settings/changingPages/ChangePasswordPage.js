import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { changePasswordSchema } from "../settingsSchema";

import { useTranslation } from "react-i18next";

import { CTA } from "@components/buttons";

import Form from "@components/Form";
import Loader from "@components/Loader";
import { InputPassword } from "@components/input";
import { ChangingPage, StatusError, ButtonPosition } from "./LocalStyles";
import { changePasswordAPI } from "@api/userAPI";

const ChangePasswordPage = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState();

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: false,
    resolver: yupResolver(changePasswordSchema()),
  });

  const formSubmit = (data) => {
    setLoading(true);
    changePasswordAPI(data)
      .then(() => {
        alert(t("Settings.ChangePassword.alertSuccess"));
        setIsError(false);
        setLoading(false);
      })
      .catch((error) => {
        if (!error.response) {
          setIsError(t("Settings.ChangePassword.errorResponse"));
          return;
        }
        switch (error.response.status) {
          case 409: {
            setIsError(t("Settings.ChangePassword.errorInvalidPassword"));
            break;
          }
          default: {
            setIsError(t("Settings.ChangePassword.errorResponse"));
            break;
          }
        }
        setLoading(false);
      });
  };

  return (
    <ChangingPage>
      <h3>{t("Settings.ChangePassword.title")}</h3>
      <div className="form">
        {loading && <Loader />}
        {!loading && (
          <Form id="settings-form" onSubmit={handleSubmit(formSubmit)}>
            <InputPassword
              ref={register}
              name="oldPassword"
              labelName={t("Settings.ChangePassword.currentPassword")}
              error={!!errors.oldPassword}
              helperText={errors?.oldPassword?.message}
            />
            <InputPassword
              ref={register}
              name="newPassword"
              labelName={t("Settings.ChangePassword.newPassword")}
              error={!!errors.newPassword}
              helperText={errors?.newPassword?.message}
            />
            <ButtonPosition>
              <CTA
                text={t("Settings.ChangePassword.button")}
                form="settings-form"
              />
            </ButtonPosition>
          </Form>
        )}
        {isError && (
          <StatusError>
            <span>{isError}</span>
          </StatusError>
        )}
      </div>
    </ChangingPage>
  );
};

export default ChangePasswordPage;
