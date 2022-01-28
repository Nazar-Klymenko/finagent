import React from "react";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

// import { QuestState } from "@dev/QuestState";
import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

import withAuthForm from "@helpers/withAuthForm";

import { useData } from "@context/dataContext";

import Form from "@components/Form";
import FormBuilder from "@components/FormBuilder";
import ProgressBar from "@components/ProgressBar";
import { Button } from "@components/buttons";
import { Checkbox, FileInput } from "@components/input";
import { PageContainer } from "@components/layout";

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
    console.log(data);
    setValues(data, "insuranceTransport", "appendedDocuments");
    setAllowSummary(true);
    router.push("./summary");
  });
  const firstOwner = watch("isFirstOwner");

  return (
    <PageContainer xs title="InsuranceTransport.title">
      <Typography variant="h4">{t("InsuranceTransport.title")}</Typography>
      <ProgressBar
        maxSteps={5}
        currentStep={5}
        label={t("InsuranceTransport.Page5.subtitle")}
      />
      <Typography variant="h6" gutterBottom>
        {t("InsuranceTransport.Page5.subtitle")}
      </Typography>

      <Form methods={methods} id="form-transport" onSubmit={formSubmit}>
        <Typography variant="body1">
          {t("InsuranceTransport.Page5.registration")} (
          {t("InsuranceTransport.Page5.twoSides")})
        </Typography>

        <FileInput name="filesTechPassport" labelName="" />

        <Typography variant="body1">
          {t("InsuranceTransport.Page5.driversLicence")} (
          {t("InsuranceTransport.Page5.twoSides")})
        </Typography>

        <FileInput name="filesPassport" labelName="" />

        <Typography variant="body1">
          {t("InsuranceTransport.Page5.currentInsurance")}
        </Typography>

        <FileInput name="filesInsurance" labelName="" />
        <Checkbox
          labelName={t("InsuranceTransport.Page5.registeredOnMe")}
          name="isFirstOwner"
        />
        {!firstOwner && (
          <>
            <Typography variant="body1">
              {t("InsuranceTransport.Page5.salesContract")} (
              {t("InsuranceTransport.Page5.twoSides")})
            </Typography>
            <FileInput name="filesCarSale" labelName="" />
          </>
        )}
      </Form>
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

export default withAuthForm(Page5);

const pageFiveSchema = yup.object().shape({
  filesTechPassport: yup
    .array()
    .nullable()
    .required("Form.Error.blank")
    .min(1, "minimalnie 1 plik")
    .max(5, "maksymalnie 5 plików")
    .test(
      "is-big-file",
      "maksymalny rozmiar pliku to 5MB",
      checkIfFilesAreTooBig
    )
    .test(
      "is-correct-file",
      "nieodpowiedni typ plików",
      checkIfFilesAreCorrectType
    ),
  filesPassport: yup
    .array()
    .nullable()
    .required("Form.Error.blank")
    .min(1, "minimalnie 1 plik")
    .max(5, "maksymalnie 5 plików")
    .test(
      "is-big-file",
      "maksymalny rozmiar pliku to 5MB",
      checkIfFilesAreTooBig
    )
    .test(
      "is-correct-file",
      "nieodpowiedni typ plików",
      checkIfFilesAreCorrectType
    ),
  filesCarSale: yup.array().when("isFirstOwner", {
    is: false,
    then: yup
      .array()
      .nullable()
      .required("Form.Error.blank")
      .min(1, "minimalnie 1 plik")
      .max(5, "maksymalnie 5 plików")
      .test(
        "is-big-file",
        "maksymalny rozmiar pliku to 5MB",
        checkIfFilesAreTooBig
      )
      .test(
        "is-correct-file",
        "nieodpowiedni typ plików",
        checkIfFilesAreCorrectType
      ),
  }),
  filesInsurance: yup
    .array()
    .nullable()
    .notRequired()
    .max(5, "maksymalnie 5 plików")
    .test(
      "is-big-file",
      "maksymalny rozmiar pliku to 5MB",
      checkIfFilesAreTooBig
    )
    .test(
      "is-correct-file",
      "nieodpowiedni typ plików",
      checkIfFilesAreCorrectType
    ),
});
function checkIfFilesAreTooBig(files: any) {
  let valid = true;
  if (files) {
    files.forEach((file: any) => {
      const size = file.size / 1024 / 1024;
      if (size > 5) {
        valid = false;
      }
    });
  }
  return valid;
}

function checkIfFilesAreCorrectType(files: any) {
  let valid = true;
  if (files) {
    files.forEach((file: any) => {
      if (!["application/pdf", "image/jpeg", "image/png"].includes(file.type)) {
        valid = false;
      }
    });
  }
  return valid;
}

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
