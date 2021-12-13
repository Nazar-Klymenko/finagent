import React from "react";

import { QuestState } from "@dev/QuestState";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import validateAppData from "@helpers/validateAppData";

import useTitle from "@hooks/useTitle";

import { useData } from "@context/dataContext";

import Form from "@components/Form";
import ProgressBar from "@components/ProgressBar";
import { CTA } from "@components/buttons";
import { ContentWrap } from "@components/content";
import { FileInput, MuiCheckbox } from "@components/input";
import { Subheader } from "@components/typography";

import { ButtonsWrap, Page, Subtitle, Title } from "../LocalStyles";
import { pageFiveValues } from "./applicationHelpers/default-values";
import { pageFiveSchema } from "./applicationHelpers/insurance-transport.schema";

type FormTypes = {
  filesTechPassport: [];
  filesPassport: [];
  filesCarSale: [];
  filesInsurance: [];
};

const Page5 = () => {
  const { t } = useTranslation();
  const { appData, setValues, setAllowSummary } = useData();
  const history = useHistory();
  useTitle("Transport insurance | FinAgent");

  const appDataValid = appData?.insuranceTransport?.appendedImages;

  const methods = useForm({
    defaultValues: pageFiveValues(appDataValid),
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: yupResolver(pageFiveSchema),
  });
  const { handleSubmit, watch } = methods;
  const formSubmit = handleSubmit((data) => {
    try {
      setAllowSummary(true);
      setValues(data, "insuranceTransport", "appendedImages");
      history.push("./summary");
    } catch (error) {
      alert("couldn't add images");
    }
  });

  const firstOwner = watch("isFirstOwner");

  return (
    <ContentWrap fullWidth>
      <QuestState data={appData} />

      <Page>
        <Title>{t("InsuranceTransport.title")}</Title>
        <ProgressBar
          maxSteps={5}
          currentStep={5}
          label={t("InsuranceTransport.Page5.subtitle")}
        />

        <Subtitle>{t("InsuranceTransport.Page5.subtitle")}</Subtitle>

        <Form methods={methods} id="form" onSubmit={formSubmit}>
          <Subheader
            subheader={t("InsuranceTransport.Page5.registration")}
            description={t("InsuranceTransport.Page5.twoSides")}
          />
          <FileInput name="filesTechPassport" labelName="" showFiles />
          <Subheader
            subheader={t("InsuranceTransport.Page5.driversLicence")}
            description={t("InsuranceTransport.Page5.twoSides")}
          />
          <FileInput name="filesPassport" labelName="" showFiles />

          <Subheader
            subheader={t("InsuranceTransport.Page5.currentInsurance")}
            description=""
          />
          <FileInput name="filesInsurance" labelName="" showFiles />
          <MuiCheckbox
            labelName={t("InsuranceTransport.Page5.registeredOnMe")}
            name="isFirstOwner"
          />
          {!firstOwner && (
            <>
              <Subheader
                subheader={t("InsuranceTransport.Page5.salesContract")}
                description={t("InsuranceTransport.Page5.twoSides")}
              />
              <FileInput name="filesCarSale" labelName="" showFiles />
            </>
          )}
        </Form>
        <ButtonsWrap multiple>
          <CTA
            text={t("Basic.buttonBack")}
            form=""
            color="secondary"
            onClick={() => {
              history.push("./4");
            }}
          />
          <CTA text={t("Basic.buttonNext")} form="form" color="primary" />
        </ButtonsWrap>
      </Page>
    </ContentWrap>
  );
};
export default Page5;

// const pageFiveSchema = yup.object().shape({
//   files: yup.mixed().nullable().required("please add images"),
// });

/* <Form id="form" onSubmit={handleSubmit(formSubmit)}>
<input
  ref={register}
  type="file"
  name="files"
  className="plztest"
  multiple
/>
<span>{errors?.files?.message}</span>
</Form> */

// const pageFiveSchema = yup.object().shape({
//   files: yup
//     .mixed()
//     .nullable()
//     .required("please add images")
//     is-big-file", "VALIDATION_FIELD_FILE_BIG", checkIfFilesAreTooBig)
//     .test(
//       "is-correct-file",
//       "VALIDATION_FIELD_FILE_WRONG_TYPE",
//       checkIfFilesAreCorrectType
//     ),
// });

// function checkIfFilesAreTooBig(files) {
//   let valid = true;
//   if (files) {
//     files.map((file) => {
//       const size = file.size / 1024 / 1024;
//       if (size > 10) {
//         valid = false;
//       }
//     });
//   }
//   return valid;
// }

// function checkIfFilesAreCorrectType(files) {
//   let valid = true;
//   if (files) {
//     files.map((file) => {
//       if (!["application/pdf", "image/jpeg", "image/png"].includes(file.type)) {
//         valid = false;
//       }
//     });
//   }
//   return valid;
// }

// <Form id="form" onSubmit={handleSubmit(formSubmit)}>
// <legend>Previous OC:</legend>
// {/* <FileInput control={control} name="InsuranceFiles"></FileInput> */}
// <legend>Are you the first owner?</legend>
// {/* {idTypes.map((idTypeEach, idx) => (
//   <Radio
//     defaultValue={idx === 0 ? true : false}
//     key={idx}
//     id={idTypeEach}
//     ref={register}
//     labelName={idTypeEach}
//     name="FirstOwner"
//     onClick={() => {
//       setShowCarSale(idTypeEach);
//     }}
//   />
// ))} */}
// {showCarSale === "No" && (
//   <>
//     <legend>Car sale contract:</legend>
//     {/* <FileInput control={control} name="CarSaleFiles"></FileInput> */}
//   </>
// )}
// </Form>

// <input
// ref={register}
// type="file"
// id="avatar"
// name="documentPhoto"
// accept="image/png, image/jpeg"
// />
