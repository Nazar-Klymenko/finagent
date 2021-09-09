import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { changeEmailAPI } from "@api/settingsAPI";

import { yupResolver } from "@hookform/resolvers/yup";
import { changeEmailSchema } from "../settingsSchema";

import { CTA } from "@components/buttons";

import Form from "@components/Form";

import MainLoader from "@components/Loader";
import { Input, InputPassword } from "@components/input";

const ChangeEmailPage = () => {
  const { t } = useTranslation();
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState("");

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
      history.push("/settings");
      setLoading(false);
    } catch (error) {
      setIsError(t("Settings.ChangeEmail.errorResponse"));
      setLoading(false);
    }
  };

  return (
    <div className="changing-page">
      <h3>{t("Settings.ChangeEmail.title")}</h3>
      <div className="form">
        <Form id="settings-form" onSubmit={handleSubmit(formSubmit)}>
          {loading && <MainLoader />}
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

        <CTA text={t("Settings.ChangeEmail.button")} form="settings-form" />

        {isError && (
          <div className="status-error">
            <span>{isError}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangeEmailPage;
