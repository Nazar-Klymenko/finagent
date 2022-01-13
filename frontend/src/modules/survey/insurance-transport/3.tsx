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
import { MuiButton } from "@components/buttons";
import {
  DateInput,
  MuiCheckbox,
  Input,
  MuiRadio,
  MuiSelect,
} from "@components/input";
import { ContentWrap } from "@components/layout";

import {
  ButtonsWrap,
  Legend,
  Page,
  RadioWrap,
  Subtitle,
  Title,
} from "../LocalStyles";
import { pageThreeValues } from "../../../helpers/applicationHelpers/default-values";
import { pageThreeSchema } from "../../../helpers/applicationHelpers/insurance-transport.schema";
import { fuelTypeOptions } from "../../../helpers/applicationHelpers/options";
import { vehicleTypeOptions } from "../../../helpers/applicationHelpers/options";

type FormTypes = {
  vehicleType: string;
  enginePower: string;
  engineVolume: string;
  fuelType: string;
  abroadImport: boolean;
  purchaseYear: Date;
  kilometrage: string;
  techExamDate: Date;
  vehicleRegDate: Date;
  polandRegDate: Date;
};

const Page3 = () => {
  const { t } = useTranslation();
  useTitle("Transport insurance | FinAgent");
  const history = useHistory();
  const { appData, setValues, setCurrentPage } = useData();

  const appDataValid = appData?.insuranceTransport?.specificData;

  const methods = useForm<FormTypes>({
    defaultValues: pageThreeValues(appDataValid),
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: yupResolver(pageThreeSchema),
  });
  const { handleSubmit, watch } = methods;

  const formSubmit = handleSubmit((data) => {
    setValues(data, "insuranceTransport", "specificData");
    setCurrentPage(4);
    history.push("./4");
  });

  const abroadImport = watch("abroadImport");
  const vehicleType = watch("vehicleType");
  return (
    <ContentWrap>
      <QuestState data={appData} />

      <Page>
        <Title>{t("InsuranceTransport.title")}</Title>
        <ProgressBar
          maxSteps={5}
          currentStep={3}
          label={t("InsuranceTransport.Page3.subtitle")}
        />

        <Subtitle>{t("InsuranceTransport.Page3.subtitle")}</Subtitle>

        <Form methods={methods} id="form" onSubmit={formSubmit}>
          <MuiSelect
            name="vehicleType"
            labelName={t("InsuranceTransport.Page2.vehicleType")}
            optionArray={vehicleTypeOptions}
          />
          <MuiSelect
            name="fuelType"
            labelName={t("InsuranceTransport.Page3.fuelType")}
            optionArray={fuelTypeOptions}
          />
          <Input
            name="enginePower"
            labelName={t("InsuranceTransport.Page3.enginePower")}
            type="text"
            placeholder="150"
          />
          <Input
            name="engineVolume"
            labelName={t("InsuranceTransport.Page3.engineVolume")}
            type="text"
            placeholder="1500"
          />

          <DateInput
            name="vehicleRegDate"
            labelName={t("InsuranceTransport.Page3.vehicleRegDate")}
            placeholder={t("Form.Placeholder.dateFull")}
          />
          <DateInput
            name="techExamDate"
            labelName={t("InsuranceTransport.Page3.techExamDate")}
            placeholder={t("Form.Placeholder.dateFull")}
          />

          <DateInput
            name="purchaseYear"
            labelName={t("InsuranceTransport.Page3.purchaseYear")}
            placeholder={t("Form.Placeholder.dateYear")}
            view={["year"]}
            format="yyyy"
          />

          <Input
            name="kilometrage"
            labelName={t("InsuranceTransport.Page3.kilometrage")}
            placeholder="eg. 100000"
          />

          {vehicleType !== "motorcycle" && (
            <MuiRadio
              legend={t("InsuranceTransport.Page3.steeringWheel")}
              name="steeringWheel"
              options={[
                {
                  label: t("InsuranceTransport.Page3.left"),
                  value: "left",
                },
                {
                  label: t("InsuranceTransport.Page3.right"),
                  value: "right",
                },
              ]}
            />
          )}

          <MuiRadio
            name="transmissionType"
            legend={t("InsuranceTransport.Page3.transmissionType")}
            options={[
              {
                label: t("InsuranceTransport.Page3.mechanical"),
                value: "mechanical",
              },
              {
                label: t("InsuranceTransport.Page3.automatic"),
                value: "automatic",
              },
            ]}
          />
          <MuiCheckbox
            labelName={t("InsuranceTransport.Page3.gasInstalation")}
            name="gasInstalation"
          />
          <MuiCheckbox
            labelName={t("InsuranceTransport.Page3.abroadImport")}
            name="abroadImport"
          />
          {abroadImport && (
            <DateInput
              name="polandRegDate"
              labelName={t("InsuranceTransport.Page3.polandRegDate")}
              placeholder={t("Form.Placeholder.dateFull")}
            />
          )}
        </Form>

        <ButtonsWrap multiple>
          <MuiButton
            text={t("Basic.buttonBack")}
            form=""
            color="secondary"
            onClick={() => {
              history.push("./2");
            }}
          />
          <MuiButton text={t("Basic.buttonNext")} form="form" color="primary" />
        </ButtonsWrap>
      </Page>
    </ContentWrap>
  );
};

export default Page3;
