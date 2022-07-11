import React from "react";

import { useRouter } from "next/router";

import { yupResolver } from "@hookform/resolvers/yup";
import { getAllLanguageSlugs, getLanguage } from "@lib/i18n";
import { Dialog, Typography } from "@mui/material";
import { ref } from "firebase/storage";
import i18next from "i18next";
import { useForm } from "react-hook-form";

import { QuestState } from "@helpers/QuestState";
import { determineAppType } from "@helpers/determineAppType";

import { auth, storage } from "@services/firebase";

import { postApplication } from "@api/applications";

import useFileUpload from "@hooks/useFileUpload";

import { useData } from "@context/dataContext";

import { Form } from "@components/Form";
import { FormBuilder } from "@components/FormBuilder";
import { ProgressBar } from "@components/ProgressBar";
import { SummaryList } from "@components/SummaryList";
import { Button } from "@components/buttons";
import { Checkbox } from "@components/input";
import { PageContainer } from "@components/layout";

import { pageSummarySchema } from "./helpers/schema";

type FormTypes = {
  agree: boolean;
};

const Summary = () => {
  const { t } = i18next;
  const { appData, setValues } = useData();
  const router = useRouter();

  const { progress, running, paused, upload } = useFileUpload();

  const appDataValid = appData.insuranceTransport;
  const summaryReady = determineAppType("insuranceTransport", appDataValid);

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
      console.log(response);
      Object.entries(appDataValid.appendedDocuments).forEach(
        (fileArray, idx) => {
          //@ts-ignore
          fileArray[1]?.length > 0 &&
            //@ts-ignore
            fileArray[1].forEach((file) => {
              const storageRef = ref(
                storage, //@ts-ignore
                `files/${auth.currentUser.uid}/${response.data.id}/userAttachments/${response.data.user_attachments[idx].filename}`
                // `files/${auth.currentUser.uid}/${response.data.id}/userAttachments/${response.data.user_attachments[idx]._id}/${response.data.user_attachments[idx].filename}`
              );
              //@ts-ignore
              upload(storageRef, file);
            });
        }
      );

      router.push("/dashboard/insurance");
    } catch (error) {
      console.log(error);
      alert("error");
    }
  });

  return (
    <PageContainer xs title={t("insuranceTransport.title")}>
      <Typography variant="h4">{t("insuranceTransport.title")}</Typography>
      <ProgressBar maxSteps={5} currentStep={5} label={t("Basic.summary")} />
      <Form methods={methods} id="form-transport" onSubmit={formSubmit}>
        <QuestState data={appData}></QuestState>

        <SummaryList
          header={t("Basic.summary")}
          applicationType="insuranceTransport"
          //@ts-ignore
          array={summaryReady}
          defaultOpen
        />

        <Checkbox
          name="agree"
          labelName={t("insuranceTransport.Summary.checkbox")}
          errorSpacer
        />
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
