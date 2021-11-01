import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { deleteUserAPI } from "@api/userAPI";

import { yupResolver } from "@hookform/resolvers/yup";
import { dangerZoneSchema } from "../settingsSchema";

import { useTranslation } from "react-i18next";
import {
  ChangingPage,
  StatusError,
  ButtonPosition,
  DangerZoneStyled,
} from "./LocalStyles";
import { InputPassword } from "@components/input";
import { CTA } from "@components/buttons";
import Form from "@components/Form";
import Loader from "@components/Loader";
import { Header } from "@components/typography";
import { useDispatch } from "react-redux";
import { setSnackbar } from "@redux/alert/actions";

const DangerZonePage = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const { register, handleSubmit, errors } = useForm({
    defaultValues: {},
    mode: "onChange",
    reValidateMode: "onBlur",
    shouldFocusError: false,
    resolver: yupResolver(dangerZoneSchema()),
  });
  const dispatch = useDispatch();

  const formSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await deleteUserAPI(data);
      if (response.status === 200) {
        dispatch(setSnackbar("success", "Settings.Disposal.alertSuccess"));
      }
      setLoading(false);
    } catch (error) {
      if (!error.response) {
        dispatch(setSnackbar("error", "Settings.Disposal.errorResponse"));

        return;
      }
      switch (error.response.status) {
        case 409: {
          dispatch(
            setSnackbar("error", "Settings.Disposal.errorInvalidPassword")
          );
          break;
        }
        default: {
          dispatch(setSnackbar("error", "Settings.Disposal.errorResponse"));
          break;
        }
      }
      setLoading(false);
    }
  };

  return (
    <ChangingPage>
      <DangerZoneStyled>
        <Header variant="h3">{t("Settings.Disposal.title")}</Header>
        {loading && <Loader />}
        <span
          className="danger-action"
          onClick={() => {
            setIsReady(true);
          }}
        >
          {t("Settings.Disposal.deleteAction")}
        </span>

        {isReady && (
          <div className="form">
            <Form id="settings-form" onSubmit={handleSubmit(formSubmit)}>
              <InputPassword
                ref={register}
                name="password"
                labelName={t("Settings.Disposal.password")}
                error={!!errors.password}
                helperText={errors?.password?.message}
              />
            </Form>

            <ButtonPosition>
              <CTA
                text={t("Settings.Disposal.button")}
                form="settings-form"
                color="primary"
              />
            </ButtonPosition>
          </div>
        )}
      </DangerZoneStyled>
    </ChangingPage>
  );
};
export default DangerZonePage;
