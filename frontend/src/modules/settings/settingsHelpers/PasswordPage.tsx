import React from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useAuth } from "@context/authContext";

import { Form } from "@components/Form";
import { Button } from "@components/buttons";
import { PasswordInput } from "@components/input";

import { changePasswordSchema } from "./settings.schema";

type FormTypes = {
  currentPassword: string;
  newPassword: string;
};

const PasswordPage = (): JSX.Element => {
  const { t } = useTranslation();
  const { setUpdatedPassword } = useAuth();
  const methods = useForm<FormTypes>({
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: false,
    resolver: yupResolver(changePasswordSchema()),
  });
  const {
    handleSubmit,
    reset,
    formState: { isDirty, isValid },
  } = methods;

  const formSubmit = handleSubmit(async (data) => {
    const response = await setUpdatedPassword(
      data.currentPassword,
      data.newPassword
    );
    if (response) {
      reset({ currentPassword: "", newPassword: "" });
    }
  });
  return (
    <>
      <Typography gutterBottom>{t("Settings.ChangePassword.title")}</Typography>

      <Form methods={methods} id="settings-password-form" onSubmit={formSubmit}>
        <PasswordInput
          name="currentPassword"
          labelName={t("Settings.ChangePassword.currentPassword")}
        />
        <PasswordInput
          name="newPassword"
          labelName={t("Settings.ChangePassword.newPassword")}
        />
        <Button
          form="settings-password-form"
          color="primary"
          disabled={!isDirty || !isValid}
        >
          {t("Settings.ChangePassword.button")}
        </Button>
      </Form>
    </>
  );
};

export { PasswordPage };
