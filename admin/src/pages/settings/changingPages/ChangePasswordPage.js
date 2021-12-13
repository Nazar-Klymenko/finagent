import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useAuth } from "@context/authContext";

import Form from "@components/Form";
import { CTA } from "@components/buttons/index";
import { InputPassword } from "@components/input/index";

import { changePasswordSchema } from "../settingsSchema";

const ChangePasswordPage = () => {
  const { t } = useTranslation();

  const { setUpdatedPassword } = useAuth();

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: false,
    resolver: yupResolver(changePasswordSchema()),
  });

  const formSubmit = (data) => {
    setUpdatedPassword(data.currentPassword, data.newPassword);
  };

  return (
    <div className="changing-page">
      <h3>{t("Settings.ChangePassword.title")}</h3>
      <div className="form">
        <Form id="settings-form" onSubmit={handleSubmit(formSubmit)}>
          <>
            <InputPassword
              ref={register}
              name="currentPassword"
              labelName={t("Settings.ChangePassword.currentPassword")}
              error={!!errors.currentPassword}
              helperText={errors?.currentPassword?.message}
            />
            <InputPassword
              ref={register}
              name="newPassword"
              labelName={t("Settings.ChangePassword.newPassword")}
              error={!!errors.newPassword}
              helperText={errors?.newPassword?.message}
            />
          </>
        </Form>
        <CTA text={t("Settings.ChangePassword.button")} form="settings-form" />
      </div>
    </div>
  );
};

export default ChangePasswordPage;
