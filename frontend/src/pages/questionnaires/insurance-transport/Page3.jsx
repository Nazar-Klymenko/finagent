import React from "react";

import { QuestState } from "@dev/QuestState";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import validateAppData from "@helpers/validateAppData";

import useTitle from "@hooks/useTitle";

import { useData } from "@context/dataContext";

import Form from "@components/Form";
import ProgressBar from "@components/ProgressBar";
import { CTA } from "@components/buttons";
import { ContentWrap } from "@components/content";
import {
  DateInput,
  MuiCheckbox,
  MuiInput,
  MuiRadio,
  MuiSelect,
} from "@components/input";

import {
  ButtonsWrap,
  Legend,
  Page,
  RadioWrap,
  Subtitle,
  Title,
} from "../LocalStyles";
import { pageThreeValues } from "./applicationHelpers/default-values";
import { fuelTypeOptions } from "./applicationHelpers/options";
import { vehicleTypeOptions } from "./applicationHelpers/options";
import { pageThreeSchema } from "./applicationHelpers/validation.schema";

const Page3 = () => {
  const { t } = useTranslation();
  useTitle("Transport insurance | FinAgent");
  const history = useHistory();
  const { appData, setValues, setCurrentPage } = useData();

  const appDataValid = validateAppData(
    appData,
    "insuranceTransport",
    "specificData"
  );

  const {
    handleSubmit,
    watch,
    control,

    formState: { errors },
  } = useForm({
    defaultValues: pageThreeValues(appDataValid),
    mode: "onChange",
    reValidateMode: "onBlur",
    shouldFocusError: true,
    resolver: yupResolver(pageThreeSchema),
  });

  const formSubmit = (data) => {
    setValues(data, "insuranceTransport", "specificData");
    setCurrentPage(4);
    history.push("./4");
  };

  const abroadImport = watch("abroadImport");
  const vehicleType = watch("vehicleType");
  return (
    <ContentWrap fullWidth>
      <QuestState data={appData} />

      <Page>
        <Title>{t("InsuranceTransport.title")}</Title>
        <ProgressBar
          maxSteps={5}
          currentStep={3}
          label={t("InsuranceTransport.Page3.subtitle")}
        />

        <Subtitle>{t("InsuranceTransport.Page3.subtitle")}</Subtitle>
        <Form id="form" onSubmit={handleSubmit(formSubmit)}>
          <MuiSelect
            control={control}
            name="vehicleType"
            defaultValue={appDataValid.vehicleType}
            labelName={t("InsuranceTransport.Page2.vehicleType")}
            optionArray={vehicleTypeOptions}
            error={!!errors.vehicleType}
            helperText={errors?.vehicleType?.message}
          />
          <MuiSelect
            control={control}
            name="fuelType"
            labelName={t("InsuranceTransport.Page3.fuelType")}
            defaultValue={appDataValid.fuelType}
            optionArray={fuelTypeOptions}
            error={!!errors.fuelType}
            helperText={errors?.fuelType?.message}
          />
          <MuiInput
            control={control}
            name="enginePower"
            labelName={t("InsuranceTransport.Page3.enginePower")}
            type="text"
            error={!!errors.enginePower}
            helperText={errors?.enginePower?.message}
            placeholder="150"
          />
          <MuiInput
            control={control}
            name="engineVolume"
            labelName={t("InsuranceTransport.Page3.engineVolume")}
            type="text"
            error={!!errors.engineVolume}
            helperText={errors?.engineVolume?.message}
            placeholder="1500"
          />

          <DateInput
            control={control}
            name="vehicleRegDate"
            labelName={t("InsuranceTransport.Page3.vehicleRegDate")}
            error={!!errors.vehicleRegDate}
            helperText={errors?.vehicleRegDate?.message}
            defaultValue={appDataValid.vehicleRegDate}
            placeholder={t("Form.Placeholder.dateFull")}
          />
          <DateInput
            control={control}
            name="techExamDate"
            labelName={t("InsuranceTransport.Page3.techExamDate")}
            error={!!errors.techExamDate}
            helperText={errors?.techExamDate?.message}
            defaultValue={appDataValid.techExamDate}
            placeholder={t("Form.Placeholder.dateFull")}
          />

          <DateInput
            control={control}
            name="purchaseYear"
            labelName={t("InsuranceTransport.Page3.purchaseYear")}
            error={!!errors.purchaseYear}
            helperText={errors?.purchaseYear?.message}
            placeholder={t("Form.Placeholder.dateYear")}
            view={["year"]}
            format="yyyy"
          />

          <MuiInput
            control={control}
            name="kilometrage"
            labelName={t("InsuranceTransport.Page3.kilometrage")}
            error={!!errors.kilometrage}
            helperText={errors?.kilometrage?.message}
            placeholder="eg. 100000"
          />

          {vehicleType !== "motorcycle" && (
            <>
              <Legend>{t("InsuranceTransport.Page3.steeringWheel")}</Legend>
              <RadioWrap>
                <MuiRadio
                  control={control}
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
              </RadioWrap>
            </>
          )}

          <Legend>{t("InsuranceTransport.Page3.transmissionType")}</Legend>
          <RadioWrap>
            <MuiRadio
              control={control}
              name="transmissionType"
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
          </RadioWrap>
          <MuiCheckbox
            control={control}
            labelName={t("InsuranceTransport.Page3.gasInstalation")}
            name="gasInstalation"
          />
          <MuiCheckbox
            control={control}
            labelName={t("InsuranceTransport.Page3.abroadImport")}
            name="abroadImport"
          />
          {abroadImport && (
            <DateInput
              control={control}
              name="polandRegDate"
              labelName={t("InsuranceTransport.Page3.polandRegDate")}
              error={!!errors.polandRegDate}
              helperText={errors?.polandRegDate?.message}
              defaultValue={appDataValid.polandRegDate}
              placeholder={t("Form.Placeholder.dateFull")}
            />
          )}
        </Form>
        <ButtonsWrap multiple>
          <CTA
            text={t("Basic.buttonBack")}
            form=""
            color="secondary"
            onClick={() => {
              history.push("./2");
            }}
          />
          <CTA text={t("Basic.buttonNext")} form="form" color="primary" />
        </ButtonsWrap>
      </Page>
    </ContentWrap>
  );
};

export default Page3;
