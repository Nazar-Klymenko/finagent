import React from "react";
import useTitle from "@hooks/useTitle";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { yupResolver } from "@hookform/resolvers/yup";

import {
  Page,
  Title,
  Subtitle,
  ButtonsWrap,
  Legend,
  RadioWrap,
} from "../LocalStyles";
import {
  Input,
  RadioGroup,
  SelectInput,
  DateInput,
  Checkbox,
} from "@components/input";
import { ContentWrap } from "@components/content";

import { CTA } from "@components/buttons";
import Form from "@components/Form";
import ProgressBar from "@components/ProgressBar";

import { useData } from "@context/dataContext";
import validateAppData from "@helpers/validateAppData";
import { fuelTypeOptions } from "./applicationHelpers/insuranceCarOptions";
import { pageThreeSchema } from "./applicationHelpers/validationSchema";
import { pageThreeValues } from "./applicationHelpers/defaultValues";

const Page3 = () => {
  const { t } = useTranslation();
  const { appData, setValues, setCurrentPage } = useData();
  const history = useHistory();
  useTitle("Transport insurance | FinAgent");

  const appDataValid = validateAppData(appData, "SpecificData");

  const { register, handleSubmit, errors, watch, control } = useForm({
    defaultValues: pageThreeValues(appDataValid),
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: true,
    resolver: yupResolver(pageThreeSchema),
  });

  const formSubmit = (data) => {
    setValues(data, "SpecificData");
    setCurrentPage(4);
    history.push("./4");
  };

  const abroadImport = watch("abroadImport");
  return (
    <ContentWrap fullWidth>
      <Page>
        <Title>{t("InsuranceTransport.title")}</Title>
        <ProgressBar maxSteps={5} currentStep={3} label="Vehicle Specifics" />

        <Subtitle>{t("InsuranceTransport.Page3.subtitle")}</Subtitle>
        <Form id="form" onSubmit={handleSubmit(formSubmit)}>
          <Input
            ref={register}
            name="enginePower"
            labelName={t("InsuranceTransport.Page3.enginePower")}
            type="text"
            error={!!errors.enginePower}
            helperText={errors?.enginePower?.message}
            placeholder="150"
          />
          <Input
            ref={register}
            name="engineVolume"
            labelName={t("InsuranceTransport.Page3.engineVolume")}
            type="text"
            error={!!errors.engineVolume}
            helperText={errors?.engineVolume?.message}
            placeholder="1500"
          />
          <SelectInput
            ref={register}
            name="fuelType"
            labelName={t("InsuranceTransport.Page3.fuelType")}
            defaultValue={appDataValid.fuelType}
            optionArray={fuelTypeOptions}
            error={!!errors.fuelType}
            helperText={errors?.fuelType?.message}
          />
          <DateInput
            control={control}
            name="vehicleRegDate"
            labelName={t("InsuranceTransport.Page3.vehicleRegDate")}
            error={!!errors.vehicleRegDate}
            helperText={errors?.vehicleRegDate?.message}
            defaultDate={appDataValid.vehicleRegDate}
          />
          <DateInput
            control={control}
            name="techExamDate"
            labelName={t("InsuranceTransport.Page3.techExamDate")}
            error={!!errors.techExamDate}
            helperText={errors?.techExamDate?.message}
            defaultDate={appDataValid.techExamDate}
          />
          <Input
            ref={register}
            name="purchaseYear"
            labelName={t("InsuranceTransport.Page3.purchaseYear")}
            error={!!errors.purchaseYear}
            helperText={errors?.purchaseYear?.message}
            placeholder="year"
          />
          <Input
            ref={register}
            name="kilometrage"
            labelName={t("InsuranceTransport.Page3.kilometrage")}
            error={!!errors.kilometrage}
            helperText={errors?.kilometrage?.message}
            placeholder="eg. 100000"
          />
          <Legend>{t("InsuranceTransport.Page3.steeringWheel")}</Legend>
          <RadioWrap>
            <RadioGroup
              name="steeringWheel"
              ref={register}
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
          <legend>{t("InsuranceTransport.Page3.transmissionType")}</legend>
          <RadioWrap>
            <RadioGroup
              name="transmissionType"
              ref={register}
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
          <Checkbox
            ref={register}
            labelName={t("InsuranceTransport.Page3.gasInstalation")}
            value={true}
            name="gasInstalation"
          />
          <Checkbox
            ref={register}
            labelName={t("InsuranceTransport.Page3.abroadImport")}
            value={true}
            name="abroadImport"
          />
          {abroadImport && (
            <DateInput
              control={control}
              name="polandRegDate"
              labelName={t("InsuranceTransport.Page3.polandRegDate")}
              error={!!errors.polandRegDate}
              helperText={errors?.polandRegDate?.message}
              defaultDate={appDataValid.polandRegDate}
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
