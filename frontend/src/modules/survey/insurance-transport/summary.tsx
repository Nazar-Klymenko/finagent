import React from "react";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

// import { QuestState } from "@dev/QuestState";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dialog, Typography } from "@mui/material";
import { ref, updateMetadata, uploadBytes } from "firebase/storage";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

import { QuestState } from "@helpers/QuestState";
import determineAppType from "@helpers/determineAppType";
import withAuthForm from "@helpers/withAuthForm";

import { auth, storage } from "@services/firebase";

import { postApplication } from "@api/applications";

import useFileUpload from "@hooks/useFileUpload";

import { useData } from "@context/dataContext";

import Form from "@components/Form";
import FormBuilder from "@components/FormBuilder";
import ProgressBar from "@components/ProgressBar";
import { SummaryList } from "@components/SummaryList";
import { Button } from "@components/buttons";
import { Checkbox } from "@components/input";
import { PageContainer } from "@components/layout";

import { pageSummarySchema } from "./helpers/schema";
import { summaryLabels } from "./helpers/summaryLabels";

type FormTypes = {
  agree: boolean;
};

const Summary = () => {
  const { t } = useTranslation();
  const { appData, setValues } = useData();
  const router = useRouter();

  const { progress, running, paused, upload } = useFileUpload();

  const appDataValid = appData.insuranceTransport;
  const summaryReady = determineAppType("transport", appDataValid);

  const methods = useForm<FormTypes>({
      defaultValues: {
        agree: false,
      },
      mode: "onChange",
      reValidateMode: "onChange",
      shouldFocusError: true,
      shouldUnregister: true,
      resolver: yupResolver(pageSummarySchema),
    }),
    { handleSubmit } = methods;

  const formSubmit = handleSubmit(async (data) => {
    try {
      if (!auth.currentUser) return;
      const response = await postApplication(
        "insraunce-transport",
        appDataValid
      );

      Object.entries(appDataValid.appendedDocuments).forEach((fileArray) => {
        //@ts-ignore
        fileArray[1]?.length > 0 &&
          //@ts-ignore
          fileArray[1].forEach((file) => {
            const storageRef = ref(
              storage, //@ts-ignore
              `files/${auth.currentUser.uid}/${response.data.id}/userAttachments/${file.path}`
            );
            //@ts-ignore
            upload(storageRef, file);
          });
      });

      router.push("dashboard/insurances");
    } catch (error) {
      console.log(error);
      alert("error");
    }
  });

  return (
    <PageContainer xs title="InsuranceTransport.title">
      <Typography variant="h4">{t("InsuranceTransport.title")}</Typography>
      <ProgressBar maxSteps={5} currentStep={5} label={t("Basic.summary")} />
      <Form methods={methods} id="form-transport" onSubmit={formSubmit}>
        <QuestState data={appData}></QuestState>

        <SummaryList
          header={t("Basic.summary")}
          applicationType="InsuranceTransport"
          //@ts-ignore
          array={summaryReady}
          defaultOpen
        />

        <Checkbox name="agree" labelName="klikając wyrażam zgodę" errorSpacer />
      </Form>
      <FormBuilder.ButtonsWrap multiple>
        <Button
          onClick={() => {
            router.push("./5");
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

export default Summary;
