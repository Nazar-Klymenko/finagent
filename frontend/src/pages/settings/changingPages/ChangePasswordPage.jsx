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

const ChangePasswordPage = () => {
  const { t } = useTranslation();
  const { setUpdatedPassword } = useAuth();
  const {
    handleSubmit,
    control,

    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onBlur",
    shouldFocusError: false,
    resolver: yupResolver(changePasswordSchema()),
  });

  const formSubmit = (data) => {
    setUpdatedPassword(data.currentPassword, data.newPassword);
  };

  return (
    <ChangingPage>
      <h3>{t("Settings.ChangePassword.title")}</h3>
      <div className="form">
        <Form id="settings-form" onSubmit={handleSubmit(formSubmit)}>
          <MuiPasswordInput
            control={control}
            name="currentPassword"
            labelName={t("Settings.ChangePassword.currentPassword")}
            error={!!errors.currentPassword}
            helperText={errors?.currentPassword?.message}
          />
          <MuiPasswordInput
            control={control}
            name="newPassword"
            labelName={t("Settings.ChangePassword.newPassword")}
            error={!!errors.newPassword}
            helperText={errors?.newPassword?.message}
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
// changePasswordAPI(data)
//   .then(() => {
//     alert(t("Settings.ChangePassword.alertSuccess"));
//     setLoading(false);
//   })
//   .catch((error) => {
//     if (!error.response) {
//       setIsError(t("Settings.ChangePassword.errorResponse"));
//       return;
//     }
//     switch (error.response.status) {
//       case 409: {
//         setIsError(t("Settings.ChangePassword.errorInvalidPassword"));
//         break;
//       }
//       default: {
//         setIsError(t("Settings.ChangePassword.errorResponse"));
//         break;
//       }
//     }
//     setLoading(false);
//   });
