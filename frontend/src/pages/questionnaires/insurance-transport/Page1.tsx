import React from "react";

import { QuestState } from "@dev/QuestState";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import useTitle from "@hooks/useTitle";

import { useData } from "@context/dataContext";

import Form from "@components/Form";
import ProgressBar from "@components/ProgressBar";
import { MuiButton } from "@components/buttons";
import {
  DateInput,
  MuiCheckbox,
  MuiInput,
  MuiPhoneInput,
  MuiRadio,
  MuiSelect,
} from "@components/input";
import { ContentWrap } from "@components/layout";

import {
  ButtonsWrap,
  InputErrorMessage,
  InputsWrap,
  Legend,
  Page,
  Subtitle,
  Title,
} from "../LocalStyles";
import { pageOneValues } from "./applicationHelpers/default-values";
import { pageOneSchema } from "./applicationHelpers/insurance-transport.schema";
import {
  maritalStatusOptions,
  professionOptions,
} from "./applicationHelpers/options";

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
  useTitle("Transport insurance | FinAgent");
  const { appData, setValues, setCurrentPage } = useData();
  const history = useHistory();

  const appDataValid = appData?.insuranceTransport?.personalData;

  const methods = useForm<FormTypes>({
    defaultValues: pageOneValues(appDataValid),
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: yupResolver(pageOneSchema),
  });

  const {
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  const isAppropLicence = watch("isAppropLicence");
  const documentTypeName = watch("documentAddedType");

  const formSubmit = handleSubmit((data) => {
    setValues(data, "insuranceTransport", "personalData");
    setCurrentPage(2);
    history.push("./2");
  });

  return (
    <ContentWrap>
      <QuestState data={appData} />
      <Page>
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

          <MuiInput
            name="name"
            labelName={t("InsuranceTransport.Page1.name")}
            type="text"
            autoComplete="given-name"
          />
          <MuiInput
            name="surname"
            labelName={t("InsuranceTransport.Page1.surname")}
            type="text"
            autoComplete="family-name"
          />
          <MuiPhoneInput
            name="phoneNumber"
            labelName={t("InsuranceTransport.Page1.phoneNumber")}
          />
          <MuiInput
            name="voivodeship"
            labelName={t("InsuranceTransport.Page1.voivodeship")}
          />
          <MuiInput
            name="city"
            labelName={t("InsuranceTransport.Page1.city")}
          />

          <InputsWrap>
            <MuiInput
              name="street"
              labelName={t("InsuranceTransport.Page1.street")}
            />
            <MuiInput
              name="houseNumber"
              labelName={t("InsuranceTransport.Page1.houseNumber")}
              width="s"
            />
            <MuiInput
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
          <MuiInput
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
      </Page>
    </ContentWrap>
  );
};

export default Page1;
