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
import { Text } from "@components/typography";

const DangerZonePage = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState();
  const [isReady, setIsReady] = useState(false);

  const { register, handleSubmit, errors } = useForm({
    defaultValues: {},
    mode: "onChange",
    reValidateMode: "onBlur",
    shouldFocusError: false,
    resolver: yupResolver(dangerZoneSchema()),
  });

  const formSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await deleteUserAPI(data);
      if (response.status === 200) {
        alert(t("Settings.Disposal.alertSuccess"));
      }
      setLoading(false);
    } catch (error) {
      if (!error.response) {
        setIsError(t("Settings.Disposal.errorResponse"));
        return;
      }
      switch (error.response.status) {
        case 409: {
          setIsError(t("Settings.Disposal.errorInvalidPassword"));
          break;
        }
        default: {
          setIsError(t("Settings.Disposal.errorResponse"));
          break;
        }
      }
      setLoading(false);
    }
  };
  return (
    <ChangingPage>
      <DangerZoneStyled>
        <Text variant="h4">{t("Settings.Disposal.title")}</Text>
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

            {isError && (
              <StatusError>
                <span>{isError}</span>
              </StatusError>
            )}
          </div>
        )}
      </DangerZoneStyled>
    </ChangingPage>
  );
};
export default DangerZonePage;
