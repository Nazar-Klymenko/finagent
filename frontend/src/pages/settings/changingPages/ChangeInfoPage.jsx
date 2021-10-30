import React, { useState, useEffect } from "react";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { settingsSchema } from "../settingsSchema";

import { useTranslation } from "react-i18next";

import { CTA } from "@components/buttons";
import Form from "@components/Form";
import Loader from "@components/Loader";
import { MuiInput } from "@components/input";

import { getSettingsAPI, updateSettingsAPI } from "@api/userAPI";
import { ChangingPage, StatusError, ButtonPosition } from "./LocalStyles";
import useFetch from "@hooks/useFetch";

const ChangePasswordPage = () => {
  const { t } = useTranslation();
  const { data, error, loading } = useFetch(getSettingsAPI());

  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [postError, setPostError] = useState("");

  const { handleSubmit, errors, reset, formState, control } = useForm({
    defaultValues: {
      name: data?.name,
      surname: data?.surname,
      phone: data?.phone,
    },
    mode: "onChange",
    reValidateMode: "onBlur",
    shouldFocusError: false,
    resolver: yupResolver(settingsSchema()),
  });

  console.log({ data });
  useEffect(() => {
    reset(data);
  }, [data, reset]);

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
        {loading && <Loader />}
        <Form id="settings-form" onSubmit={handleSubmit(formSubmit)}>
          <MuiInput
            control={control}
            name="name"
            labelName={t("Settings.ChangeInfo.name")}
            autoComplete="given-name"
            error={!!errors.name}
            helperText={errors?.name?.message}
          />
          <MuiInput
            control={control}
            name="surname"
            labelName={t("Settings.ChangeInfo.surname")}
            autoComplete="family-name"
            error={!!errors.surname}
            helperText={errors?.surname?.message}
          />
          <MuiInput
            control={control}
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
            color="primary"
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
