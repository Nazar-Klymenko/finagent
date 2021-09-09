import React from "react";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { changeEmailAPI } from "@api/userAPI";

import { yupResolver } from "@hookform/resolvers/yup";
import { changeEmailSchema } from "../settingsSchema";

import { useTranslation } from "react-i18next";

import { CTA } from "@components/buttons";

import Form from "@components/Form";

import Loader from "@components/Loader";
import { Input, InputPassword } from "@components/input";
import { ChangingPage, StatusError, ButtonPosition } from "./LocalStyles";

const ChangeEmailPage = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState();

  const { register, handleSubmit, errors } = useForm({
    defaultValues: {},
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: false,
    resolver: yupResolver(changeEmailSchema()),
  });

  const formSubmit = async (data) => {
    setLoading(true);
    try {
      await changeEmailAPI(data);
      alert(t("Settings.ChangeEmail.alertSuccess"));
      setLoading(false);
    } catch (error) {
      setIsError(t("Settings.ChangeEmail.errorResponse"));
      setLoading(false);
    }
  };

  return (
    <ChangingPage>
      <h3>{t("Settings.ChangeEmail.title")}</h3>
      <div className="form">
        <Form id="settings-form" onSubmit={handleSubmit(formSubmit)}>
          {loading && <Loader />}
          {!loading && (
            <>
              <InputPassword
                ref={register}
                name="currentPassword"
                labelName={t("Settings.ChangeEmail.currentPassword")}
                error={!!errors.currentPassword}
                helperText={errors?.currentPassword?.message}
              />
              <Input
                ref={register}
                name="email"
                labelName={t("Settings.ChangeEmail.newEmail")}
                error={!!errors.email}
                helperText={errors?.email?.message}
              />
            </>
          )}
        </Form>
        <ButtonPosition>
          <CTA text={t("Settings.ChangeEmail.button")} form="settings-form" />
        </ButtonPosition>
        {isError && (
          <StatusError>
            <span>{isError}</span>
          </StatusError>
        )}
      </div>
    </ChangingPage>
  );
};

export default ChangeEmailPage;
