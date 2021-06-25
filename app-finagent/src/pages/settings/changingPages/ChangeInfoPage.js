import React, { useState, useEffect } from "react";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { settingsSchema } from "../settingsSchema";

import { useTranslation } from "react-i18next";

import { CTA } from "@components/buttons";
import Form from "@components/Form";
import Loader from "@components/Loader";
import { Input } from "@components/input";

import { getSettingsAPI, updateSettingsAPI } from "@api/userAPI";
import { ChangingPage, StatusError, ButtonPosition } from "./LocalStyles";
import useFetch from "@hooks/useFetch";

const ChangePasswordPage = () => {
  const { t } = useTranslation();
  const { response, error, isLoading } = useFetch(getSettingsAPI);

  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [postError, setPostError] = useState("");

  const [defaultSettings, setDefaultSettings] = useState({});

  useEffect(() => {
    setDefaultSettings(response.data);
  }, [response]);

  const { register, handleSubmit, errors, reset, formState } = useForm({
    defaultValues: {
      name: defaultSettings?.name,
      surname: defaultSettings?.surname,
      phone: defaultSettings?.phone,
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: false,
    resolver: yupResolver(settingsSchema()),
  });

  useEffect(() => {
    reset(defaultSettings);
  }, [defaultSettings, reset]);

  const { isDirty } = formState;

  const formSubmit = async (data) => {
    setIsBtnLoading(true);
    try {
      await updateSettingsAPI(data);
      reset(data);
      alert(t("Settings.ChangeInfo.alertSuccess"));
    } catch (error) {
      setPostError(t("Settings.ChangeInfo.errorResponse"));
    }
    setIsBtnLoading(false);
  };

  return (
    <ChangingPage>
      <h3>{t("Settings.ChangeInfo.title")}</h3>
      <div className="form">
        {isLoading && <Loader />}
        <Form id="settings-form" onSubmit={handleSubmit(formSubmit)}>
          <Input
            ref={register}
            name="name"
            labelName={t("Settings.ChangeInfo.name")}
            autoComplete="given-name"
            error={!!errors.name}
            helperText={errors?.name?.message}
          />
          <Input
            ref={register}
            name="surname"
            labelName={t("Settings.ChangeInfo.surname")}
            autoComplete="family-name"
            error={!!errors.surname}
            helperText={errors?.surname?.message}
          />
          <Input
            ref={register}
            name="phone"
            labelName={t("Settings.ChangeInfo.phone")}
            error={!!errors.phone}
            helperText={errors?.phone?.message}
          />
        </Form>

        <ButtonPosition>
          <CTA
            isBlocked={!isDirty}
            isLoading={isBtnLoading}
            text={t("Settings.ChangeInfo.button")}
            form="settings-form"
          />
        </ButtonPosition>

        {postError && (
          <div className="status-error">
            <span>{postError}</span>
          </div>
        )}
        {error && (
          <StatusError>
            <span>Error loading info</span>
          </StatusError>
        )}
      </div>
    </ChangingPage>
  );
};

export default ChangePasswordPage;
