import React from "react";
import useTitle from "@hooks/useTitle";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Page, Title, Subtitle, ButtonsWrap } from "../LocalStyles";
import { ContentWrap } from "@components/content";
import { CTA } from "@components/buttons";
import Form from "@components/Form";
import ProgressBar from "@components/ProgressBar";

import { useData } from "@context/dataContext";
import validateAppData from "@helpers/validateAppData";
import { pageFiveSchema } from "./applicationHelpers/validationSchema";
import { pageFiveValues } from "./applicationHelpers/defaultValues";
import { Checkbox, FileInput } from "@components/input";
import { Subheader } from "@components/typography";
import { QuestState } from "@dev/QuestState";

const Page5 = () => {
  const { t } = useTranslation();
  const { appData, setValues, setAllowSummary } = useData();
  const history = useHistory();
  useTitle("Transport insurance | FinAgent");

  const appDataValid = validateAppData(appData, "AppendedImages");

  const { register, handleSubmit, errors, control, watch } = useForm({
    defaultValues: pageFiveValues(appDataValid),
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: yupResolver(pageFiveSchema),
  });

  const formSubmit = async (data) => {
    try {
      setAllowSummary(true);
      setValues(data, "AppendedImages");
      history.push("./summary");
    } catch (error) {
      alert("couldn't add images");
    }
  };

  const firstOwner = watch("isFirstOwner");

  return (
    <ContentWrap fullWidth>
      <QuestState data={appData} />

      <Page>
        <Title>{t("InsuranceTransport.title")}</Title>
        <ProgressBar maxSteps={5} currentStep={5} label="Attachments" />

        <Subtitle>{t("InsuranceTransport.Page5.subtitle")}</Subtitle>
        <Form id="form" onSubmit={handleSubmit(formSubmit)}>
          <Subheader
            subheader="Фото техпаспорта"
            description="необходимо прикрепить полный разворот двух сторон"
          />
          <FileInput
            control={control}
            name="filesTechPassport"
            labelName=""
            showFiles
            error={!!errors.filesTechPassport}
            helperText={errors?.filesTechPassport?.message}
          />
          <Subheader
            subheader="Фото водительских прав"
            description="необходимо прикрепить полный разворот двух сторон"
          />
          <FileInput
            control={control}
            name="filesPassport"
            labelName=""
            showFiles
            error={!!errors.filesPassport}
            helperText={errors?.filesPassport?.message}
          />

          <Subheader subheader="Фото актуальной страховки" description="" />
          <FileInput
            control={control}
            name="filesInsurance"
            labelName=""
            showFiles
            error={!!errors.filesInsurance}
            helperText={errors?.filesInsurance?.message}
          />
          <Checkbox
            ref={register}
            labelName="Транспортное средство уже зарегестрировано на меня / мою фирму"
            value={true}
            name="isFirstOwner"
          />
          {!firstOwner && (
            <>
              <Subheader
                subheader="Фото договора купли продажи"
                description="необходимо прикрепить полный разворот двух сторон"
              />
              <FileInput
                control={control}
                name="filesCarSale"
                labelName=""
                showFiles
                error={!!errors.filesCarSale}
                helperText={errors?.filesCarSale?.message}
              />
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
//     .test("is-big-file", "VALIDATION_FIELD_FILE_BIG", checkIfFilesAreTooBig)
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
//     defaultChecked={idx === 0 ? true : false}
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
