import React, { useState } from "react";

import { useTranslation } from "next-i18next";

import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import useSWR from "swr";

import { fetcher } from "@helpers/swrFetcher";

import { getSettingsAPI, updateSettingsAPI } from "@api/userAPI";

import { useAuth } from "@context/authContext";

import { Form } from "@components/Form";
import { Loader } from "@components/Loader";
import { Button } from "@components/buttons";
import { Input, MuiPhoneInput } from "@components/input";

import { settingsSchema } from "./settings.schema";

type FormTypes = {
  fullName: string;
  phone: string;
};

const ChangeInfoPage = () => {
  const { t } = useTranslation();

  const { setUpdatedInfo } = useAuth();

  const methods = useForm<FormTypes>({
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: false,
    resolver: yupResolver(settingsSchema()),
  });
  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = methods;

  const { data, error } = useSWR(`/user/settings`, fetcher);
  if (!data && !error) return <Loader />;

  const formSubmit = handleSubmit(async (data) => {
    try {
      await setUpdatedInfo(data);
      reset(data);
    } catch (error) {}
  });

  if (!data && !error) return <Loader />;

  return (
    <>
      <Typography gutterBottom>{t("Settings.ChangeInfo.title")}</Typography>
      <Form methods={methods} id="settings-info-form" onSubmit={formSubmit}>
        <Input
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

      <Button disabled={!isDirty} form="settings-info-form" color="primary">
        {t("Settings.ChangeInfo.button")}
      </Button>
    </>
  );
};

export { ChangeInfoPage };
