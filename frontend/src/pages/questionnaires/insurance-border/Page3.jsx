import useTitle from "@hooks/useTitle";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { pageThreeSchema } from "./applicationHelpers/insuranceBorderSchema";

import { Page, Title, Subtitle, ButtonsWrap } from "../LocalStyles";
import { MuiInput, MuiPhoneInput } from "@components/input";
import { ContentWrap } from "@components/content";
import { CTA } from "@components/buttons";
import Form from "@components/Form";
import ProgressBar from "@components/ProgressBar";

import { useData } from "@context/dataContext";
import validateAppData from "@helpers/validateAppData";
import { QuestState } from "@dev/QuestState";

const Page3 = () => {
  const { t } = useTranslation();
  useTitle("Border insurance | FinAgent");
  const history = useHistory();

  const { appData, setValues, setAllowSummary } = useData();

  const appDataValid = validateAppData(
    appData,
    "insuranceBorder",
    "personalData"
  );

  const { register, handleSubmit, errors, control } = useForm({
    defaultValues: {
      name: appDataValid.name,
      surname: appDataValid.surname,
      phoneNumber: appDataValid.phoneNumber,
      email: appDataValid.email,
      country: appDataValid.country,
      city: appDataValid.city,
      postIndex: appDataValid.postIndex,
      street: appDataValid.street,
      houseNumber: appDataValid.houseNumber,
    },
    mode: "onChange",
    reValidateMode: "onBlur",
    shouldFocusError: true,
    resolver: yupResolver(pageThreeSchema),
  });

  const formSubmit = (data) => {
    setValues(data, "insuranceBorder", "personalData");
    setAllowSummary(true);
    history.push("./summary");
  };

  return (
    <ContentWrap fullWidth>
      <QuestState data={appData} />

      <Page>
        <Title>{t("InsuranceBorder.title")}</Title>
        <ProgressBar
          maxSteps={3}
          currentStep={3}
          label={t("InsuranceBorder.Page3.subtitle")}
        />
        <Subtitle>{t("InsuranceBorder.Page3.subtitle")}</Subtitle>
        <Form id="form" onSubmit={handleSubmit(formSubmit)}>
          <MuiInput
            control={control}
            name="name"
            labelName={t("InsuranceBorder.Page3.name")}
            error={!!errors.name}
            helperText={errors?.name?.message}
            autoComplete="given-name"
          />
          <MuiInput
            control={control}
            name="surname"
            labelName={t("InsuranceBorder.Page3.surname")}
            error={!!errors.surname}
            helperText={errors?.surname?.message}
            autoComplete="family-name"
          />
          <MuiPhoneInput
            control={control}
            name="phoneNumber"
            labelName={t("InsuranceBorder.Page3.phoneNumber")}
            error={!!errors.phoneNumber}
            helperText={errors?.phoneNumber?.message}
          />
          <MuiInput
            control={control}
            name="email"
            labelName={t("InsuranceBorder.Page3.email")}
            error={!!errors.email}
            helperText={errors?.email?.message}
            placeholder="example@mail.com"
          />
          <MuiInput
            control={control}
            name="country"
            labelName={t("InsuranceBorder.Page3.country")}
            type="text"
            error={!!errors.country}
            helperText={errors?.country?.message}
            placeholder="Poland"
          />
          <MuiInput
            control={control}
            name="city"
            labelName={t("InsuranceBorder.Page3.city")}
            type="text"
            error={!!errors.city}
            helperText={errors?.city?.message}
            placeholder="Warsaw"
          />
          <MuiInput
            control={control}
            name="postIndex"
            labelName={t("InsuranceBorder.Page3.postIndex")}
            error={!!errors.postIndex}
            helperText={errors?.postIndex?.message}
            placeholder="123-45"
          />
          <MuiInput
            control={control}
            name="street"
            labelName={t("InsuranceBorder.Page3.street")}
            error={!!errors.street}
            helperText={errors?.street?.message}
            placeholder="Bialostocka"
          />
          <MuiInput
            control={control}
            name="houseNumber"
            labelName={t("InsuranceBorder.Page3.houseNumber")}
            error={!!errors.houseNumber}
            helperText={errors?.houseNumber?.message}
            placeholder="14"
          />
        </Form>
        <ButtonsWrap multiple>
          <CTA
            text={t("Basic.buttonBack")}
            color="secondary"
            form=""
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
