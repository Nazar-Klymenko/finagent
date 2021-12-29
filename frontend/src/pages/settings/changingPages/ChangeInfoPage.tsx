import React, { useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";

import { getSettingsAPI, updateSettingsAPI } from "@api/userAPI";

import { useAuth } from "@context/authContext";

import { setSnackbar } from "@redux/alert/actions";

import Form from "@components/Form";
import Loader from "@components/Loader";
import { MuiButton } from "@components/buttons";
import { MuiInput, MuiPhoneInput } from "@components/input";

import { ButtonPosition, ChangingPage, StatusError } from "../LocalStyles";
import { settingsSchema } from "../settingsSchema";

type FormTypes = {
  fullName: string;
  phone: string;
};

const ChangePasswordPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [postError, setPostError] = useState("");

  const { updateDisplayName } = useAuth();

  const methods = useForm<FormTypes>({
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: false,
    resolver: yupResolver(settingsSchema()),
  });
  const { handleSubmit, reset, formState } = methods;

  const { isDirty } = formState;

  async function getSettings() {
    const { data } = await getSettingsAPI();
    return data;
  }
  let { data, error, isFetching, refetch } = useQuery(
    [`settings`],
    () => getSettings(),
    { keepPreviousData: true, staleTime: 5000, refetchOnWindowFocus: false }
  );

  const formSubmit = handleSubmit(async (data) => {
    setIsBtnLoading(true);
    try {
      await updateSettingsAPI(data);
      reset(data);
      updateDisplayName(data.fullName);
      dispatch(setSnackbar("success", "Settings.ChangeInfo.alertSuccess"));
    } catch (error) {
      setPostError(t("Settings.ChangeInfo.errorResponse"));
    }
    setIsBtnLoading(false);
  });

  if (isFetching) {
    return <Loader />;
  }
  return (
    <ChangingPage>
      <h3>{t("Settings.ChangeInfo.title")}</h3>
      <div className="form">
        <Form methods={methods} id="settings-form" onSubmit={formSubmit}>
          <MuiInput
            name="fullName"
            labelName={t("Settings.ChangeInfo.fullName")}
            autoComplete="name"
            // @ts-ignore
            defaultValue={data?.fullName}
          />

          <MuiPhoneInput
            name="phone"
            labelName={t("Settings.ChangeInfo.phone")}
            optional
            // @ts-ignore
            defaultValue={data?.phone}
          />
        </Form>

        <ButtonPosition>
          <MuiButton
            isDisabled={!isDirty}
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
