import React from "react";

// import { QuestState } from "@dev/QuestState";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";

// import useTitle from "@hooks/useTitle";

import { useData } from "@context/dataContext";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Form from "@components/Form";
import ProgressBar from "@components/ProgressBar";
import { Button } from "@components/buttons";
import {
  // DateInput,
  // MuiCheckbox,
  Input,
  FileInput,
  MuiPhoneInput,
  // MuiRadio,
  // MuiSelect,
} from "@components/input";
import { PageContainer } from "@components/layout";

// import {
//   ButtonsWrap,
//   InputErrorMessage,
//   InputsWrap,
//   Legend,
//   Page,
//   Subtitle,
//   Title,
// } from "../LocalStyles";
import { pageOneValues } from "../../../helpers/applicationHelpers/default-values";
import { pageOneSchema } from "../../../helpers/applicationHelpers/insurance-transport.schema";
import {
  maritalStatusOptions,
  professionOptions,
} from "../../../helpers/applicationHelpers/options";

type FormTypes = {
  oc: boolean;
  ac: boolean;
  greenCard: boolean;
  assistance: boolean;
  coverage: any;
  name: string;
  surname: string;
  phoneNumber: string;
  postIndex: string;
  city: string;
  voivodeship: string;
  street: string;
  houseNumber: string;
  documentAddedType: string;
  documentAdded: string;
  isAppropLicence: boolean;
  drivingLicenceDate: Date;
  profession: string;
  maritalStatus: string;
  atleastOneCheckbox: any;
};

const Page1 = () => {
  const { t } = useTranslation();
  // useTitle("Transport insurance | FinAgent");
  // const { appData, setValues, setCurrentPage } = useData();
  // const history = useHistory();

  // const appDataValid = appData?.insuranceTransport?.personalData;

  const methods = useForm<FormTypes>({
    // defaultValues: pageOneValues(appDataValid),
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    // resolver: yupResolver(pageOneSchema),
  });

  const {
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  const isAppropLicence = watch("isAppropLicence");
  const documentTypeName = watch("documentAddedType");

  const formSubmit = handleSubmit((data) => {
    console.log(data);
    // setValues(data, "insuranceTransport", "personalData");
    // setCurrentPage(2);
    // history.push("./2");
  });

  return (
    <PageContainer xs title="InsuranceTransport.title">
      <Form methods={methods} id="form-transport" onSubmit={formSubmit}>
        <Input
          name="name"
          labelName={t("InsuranceTransport.Page1.name")}
          type="text"
          autoComplete="given-name"
        />
        <FileInput
          name="files"
          labelName={t("InsuranceTransport.Page1.name")}
        />
      </Form>
      <Button form="form-transport" color="primary">
        {t("Basic.buttonNext")}
      </Button>
      {/* <QuestState data={appData} /> */}
      {/* <Page>
        <Title>{t("InsuranceTransport.title")}</Title>
        <ProgressBar
          maxSteps={5}
          currentStep={1}
          label={t("InsuranceTransport.Page1.subtitle")}
        />
        <Subtitle>{t("InsuranceTransport.Page1.subtitle")}</Subtitle>
        <Form methods={methods} id="form-transport" onSubmit={formSubmit}>
          <Legend>{t("InsuranceTransport.Page1.insuranceCoverage")}</Legend>

          <MuiCheckbox labelName={t("InsuranceTransport.Page1.oc")} name="oc" />
          <MuiCheckbox labelName={t("InsuranceTransport.Page1.ac")} name="ac" />
          <MuiCheckbox
            labelName={t("InsuranceTransport.Page1.greenCard")}
            name="greenCard"
          />
          <MuiCheckbox
            labelName={t("InsuranceTransport.Page1.assistance")}
            name="assistance"
          />

          <InputErrorMessage>
            <span className="invis-star">*</span>
            {errors?.coverage && <span>{t(errors?.coverage?.message)}</span>}
          </InputErrorMessage>

          <Input
            name="name"
            labelName={t("InsuranceTransport.Page1.name")}
            type="text"
            autoComplete="given-name"
          />
          <Input
            name="surname"
            labelName={t("InsuranceTransport.Page1.surname")}
            type="text"
            autoComplete="family-name"
          />
          <MuiPhoneInput
            name="phoneNumber"
            labelName={t("InsuranceTransport.Page1.phoneNumber")}
          />
          <Input
            name="voivodeship"
            labelName={t("InsuranceTransport.Page1.voivodeship")}
          />
          <Input
            name="city"
            labelName={t("InsuranceTransport.Page1.city")}
          />

          <InputsWrap>
            <Input
              name="street"
              labelName={t("InsuranceTransport.Page1.street")}
            />
            <Input
              name="houseNumber"
              labelName={t("InsuranceTransport.Page1.houseNumber")}
              width="s"
            />
            <Input
              name="postIndex"
              labelName={t("InsuranceTransport.Page1.postIndex")}
              autoComplete="postal-code"
              width="s"
            />
          </InputsWrap>

          <MuiRadio
            name="documentAddedType"
            legend={t("InsuranceTransport.Page1.documentAddedType")}
            options={[
              {
                label: t("InsuranceTransport.Page1.pesel"),
                value: "pesel",
              },
              {
                label: t("InsuranceTransport.Page1.regon"),
                value: "regon",
              },
              {
                label: t("InsuranceTransport.Page1.passport"),
                value: "passport",
              },
            ]}
          />
          <Input
            name="documentAdded"
            labelName={t(`InsuranceTransport.Page1.${documentTypeName}`)}
          />

          <MuiSelect
            name="profession"
            labelName={t("InsuranceTransport.Page1.profession")}
            optionArray={professionOptions}
          />
          <MuiSelect
            name="maritalStatus"
            labelName={t("InsuranceTransport.Page1.maritalStatus")}
            optionArray={maritalStatusOptions}
          />

          <MuiCheckbox
            name="isAppropLicence"
            labelName={t("InsuranceTransport.Page1.isAppropLicence")}
          />

          {isAppropLicence && (
            <DateInput
              name="drivingLicenceDate"
              labelName={t("InsuranceTransport.Page1.drivingLicenceDate")}
              placeholder={t("Form.Placeholder.dateFull")}
              disableFuture
              view={["year", "month", "date"]}
            />
          )}
        </Form>

        <ButtonsWrap>
          <MuiButton
            text={t("Basic.buttonNext")}
            form="form-transport"
            color="primary"
          />
        </ButtonsWrap>
      </Page> */}
    </PageContainer>
  );
};

export default Page1;

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
