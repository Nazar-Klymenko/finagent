import React from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useAuth } from "@context/authContext";

import Form from "@components/Form";
import { CTA } from "@components/buttons";
import { MuiPasswordInput } from "@components/input";

import { ButtonPosition, ChangingPage } from "../LocalStyles";
import { changePasswordSchema } from "../settingsSchema";

type FormTypes = {
  currentPassword: string;
  newPassword: string;
};

const ChangePasswordPage = () => {
  const { t } = useTranslation();
  const { setUpdatedPassword } = useAuth();

  const methods = useForm<FormTypes>({
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: false,
    resolver: yupResolver(changePasswordSchema()),
  });
  const { handleSubmit } = methods;
  const formSubmit = handleSubmit((data) => {
    setUpdatedPassword(data.currentPassword, data.newPassword);
  });

  return (
    <ChangingPage>
      <h3>{t("Settings.ChangePassword.title")}</h3>
      <div className="form">
        <Form methods={methods} id="settings-form" onSubmit={formSubmit}>
          <MuiPasswordInput
            name="currentPassword"
            labelName={t("Settings.ChangePassword.currentPassword")}
          />
          <MuiPasswordInput
            name="newPassword"
            labelName={t("Settings.ChangePassword.newPassword")}
          />
          <ButtonPosition>
            <CTA
              text={t("Settings.ChangePassword.button")}
              form="settings-form"
              color="primary"
            />
          </ButtonPosition>
        </Form>
      </div>
    </ChangingPage>
  );
};

export default ChangePasswordPage;
