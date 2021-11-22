import React, { useEffect, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { getSettingsAPI, updateSettingsAPI } from "@api/userAPI";

import useFetch from "@hooks/useFetch";

import { useAuth } from "@context/authContext";

import { setSnackbar } from "@redux/alert/actions";

import Form from "@components/Form";
import Loader from "@components/Loader";
import { CTA } from "@components/buttons";
import { MuiInput, MuiPhoneInput } from "@components/input";

import { ButtonPosition, ChangingPage, StatusError } from "../LocalStyles";
import { settingsSchema } from "../settingsSchema";

const ChangePasswordPage = () => {
  const { t } = useTranslation();
  const { data, error, loading } = useFetch(getSettingsAPI());
  const dispatch = useDispatch();
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [postError, setPostError] = useState("");

  const { updateDisplayName } = useAuth();

  const { handleSubmit, reset, formState, control } = useForm({
    defaultValues: {
      fullName: data?.displayName,
      phone: data?.phone,
    },
    mode: "onChange",
    reValidateMode: "onBlur",
    shouldFocusError: false,
    resolver: yupResolver(settingsSchema()),
  });

  const { errors } = formState;

  useEffect(() => {
    reset(data);
  }, [data, reset]);

  const { isDirty } = formState;

  const formSubmit = async (data) => {
    setIsBtnLoading(true);
    try {
      await updateSettingsAPI(data);
      reset(data);
      await updateDisplayName(data.fullName);
      dispatch(setSnackbar("success", "Settings.ChangeInfo.alertSuccess"));
    } catch (error) {
      setPostError(t("Settings.ChangeInfo.errorResponse"));
    }
    setIsBtnLoading(false);
  };

  if (loading) {
    return <Loader />;
  }
  return (
    <ChangingPage>
      <h3>{t("Settings.ChangeInfo.title")}</h3>
      <div className="form">
        <Form id="settings-form" onSubmit={handleSubmit(formSubmit)}>
          <MuiInput
            control={control}
            name="fullName"
            labelName={t("Settings.ChangeInfo.fullName")}
            autoComplete="name"
            error={!!errors.fullName}
            helperText={errors?.fullName?.message}
          />

          <MuiPhoneInput
            control={control}
            name="phone"
            labelName={t("Settings.ChangeInfo.phone")}
            error={!!errors.phone}
            helperText={errors?.phone?.message}
            optional
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
