import { useEffect, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { getSettingsAPI, updateSettingsAPI } from "@api/settingsAPI";

import { useAuth } from "@context/authContext";

import Form from "@components/Form";
import Loader from "@components/Loader";
import { CTA } from "@components/buttons";
import { Input } from "@components/input";

import { settingsSchema } from "../settingsSchema";
import { ButtonPosition, ChangingPage, StatusError } from "./LocalStyles";

const ChangePasswordPage = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [postError, setPostError] = useState("");
  const [error, setError] = useState("");

  const [defaultSettings, setDefaultSettings] = useState({});

  const { updateDisplayName } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      try {
        const response = await getSettingsAPI();
        setDefaultSettings(response.data);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    reset(defaultSettings);
  }, [defaultSettings]);

  const { register, handleSubmit, errors, reset, formState } = useForm({
    defaultValues: {
      name: defaultSettings.name,
      surname: defaultSettings.surname,
      phone: defaultSettings.phone,
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: false,
    resolver: yupResolver(settingsSchema()),
  });

  const { isDirty } = formState;

  const formSubmit = async (data) => {
    try {
      await updateSettingsAPI(data);
      reset(data);
      alert(t("Settings.ChangeInfo.alertSuccess"));
      updateDisplayName(data.name, data.surname);
    } catch (error) {
      setPostError(t("Settings.ChangeInfo.errorResponse"));
    }
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
            isLoading={isLoading}
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
