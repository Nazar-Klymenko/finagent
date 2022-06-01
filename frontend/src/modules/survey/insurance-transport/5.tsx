import React from "react";

import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import { useForm } from "react-hook-form";

import { QuestState } from "@helpers/QuestState";

import { useData } from "@context/dataContext";

import { Form } from "@components/Form";
import { FormBuilder } from "@components/FormBuilder";
import { ProgressBar } from "@components/ProgressBar";
import { Button } from "@components/buttons";
import { Checkbox, FileInput } from "@components/input";
import { PageContainer } from "@components/layout";

import { pageFiveSchema } from "./helpers/schema";

type FormTypes = {
  filesTechPassport: File[] | null;
  filesPassport: File[] | null;
  filesCarSale: File[] | null;
  filesInsurance: File[] | null;
  isFirstOwner: boolean;
};

const Page5 = () => {
  const { t } = useTranslation();
  const { appData, setValues, setAllowSummary } = useData();
  const router = useRouter();

  const appDataValid = appData.insuranceTransport.appendedDocuments;

  const methods = useForm<FormTypes>({
      defaultValues: {
        filesTechPassport: appDataValid.filesTechPassport,
        filesPassport: appDataValid.filesTechPassport,
        filesCarSale: appDataValid.filesTechPassport,
        isFirstOwner: appDataValid.isFirstOwner,
        filesInsurance: appDataValid.filesTechPassport,
      },
      mode: "onChange",
      reValidateMode: "onChange",
      shouldFocusError: true,
      shouldUnregister: true,

      resolver: yupResolver(pageFiveSchema),
    }),
    { handleSubmit, watch } = methods;

  const formSubmit = handleSubmit((data) => {
    setValues(data, "insuranceTransport", `appendedDocuments`);
    setAllowSummary(true);
    router.push("./summary");
  });
  const firstOwner = watch("isFirstOwner");

  return (
    <PageContainer xs title="insuranceTransport.title">
      <Typography variant="h4">{t("insuranceTransport.title")}</Typography>
      <ProgressBar
        maxSteps={5}
        currentStep={5}
        label={t("insuranceTransport.Page5.subtitle")}
      />
      <Typography variant="h6" gutterBottom>
        {t("insuranceTransport.Page5.subtitle")}
      </Typography>

      <Form methods={methods} id="form-transport" onSubmit={formSubmit}>
        <Typography variant="body1">
          {t("insuranceTransport.Page5.registration")} (
          {t("insuranceTransport.Page5.twoSides")})
        </Typography>
        <FileInput
          name="filesTechPassport"
          labelName=""
          defaultValue={appDataValid.filesTechPassport}
        />
        <Typography variant="body1">
          {t("insuranceTransport.Page5.driversLicence")} (
          {t("insuranceTransport.Page5.twoSides")})
        </Typography>
        <FileInput
          name="filesPassport"
          labelName=""
          defaultValue={appDataValid.filesPassport}
        />

        <Typography variant="body1">
          {t("insuranceTransport.Page5.currentInsurance")}
        </Typography>

        <FileInput
          name="filesInsurance"
          labelName=""
          defaultValue={appDataValid.filesInsurance}
        />
        <Checkbox
          labelName={t("insuranceTransport.Page5.registeredOnMe")}
          name="isFirstOwner"
        />
        {!firstOwner && (
          <>
            <Typography variant="body1">
              {t("insuranceTransport.Page5.salesContract")} (
            </Typography>
            <FileInput
              name="filesCarSale"
              labelName=""
              defaultValue={appDataValid.filesCarSale}
            />
          </>
        )}
      </Form>

      <QuestState data={appData}></QuestState>

      <FormBuilder.ButtonsWrap multiple>
        <Button
          onClick={() => {
            router.push("./4");
          }}
          form=""
          color="secondary"
        >
          {t("Basic.buttonBack")}
        </Button>
        <Button form="form-transport" color="primary">
          {t("Basic.buttonNext")}
        </Button>
      </FormBuilder.ButtonsWrap>
    </PageContainer>
  );
};

export default Page5;
