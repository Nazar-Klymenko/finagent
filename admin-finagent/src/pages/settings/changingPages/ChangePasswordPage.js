import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { changePasswordAPI } from "@api/settingsAPI";

import { yupResolver } from "@hookform/resolvers/yup";
import { changePasswordSchema } from "../settingsSchema";

import { CTA } from "@components/buttons/index";

import Form from "@components/Form";
import MainLoader from "@components/Loader";
import { InputPassword } from "@components/input/index";

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
    <div className="changing-page">
      <h3>{t("Settings.ChangePassword.title")}</h3>
      <div className="form">
        <Form id="settings-form" onSubmit={handleSubmit(formSubmit)}>
          {loading && <MainLoader />}
          {!loading && (
            <>
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
            </>
          )}
        </Form>

        <CTA text={t("Settings.ChangePassword.button")} form="settings-form" />

        {isError && (
          <div className="status-error">
            <span>{isError}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangePasswordPage;
