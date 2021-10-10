import useTitle from "@hooks/useTitle";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { pageThreeSchema } from "./applicationHelpers/insuranceBorderSchema";

import { Page, Title, Subtitle, ButtonsWrap } from "../LocalStyles";
import { Input, PhoneInput } from "@components/input";
import { ContentWrap } from "@components/content";
import { CTA } from "@components/buttons";
import Form from "@components/Form";
import ProgressBar from "@components/ProgressBar";

import { useData } from "@context/dataContext";
import validateAppData from "@helpers/validateAppData";
import { QuestState } from "@dev/QuestState";

const Page3 = () => {
  const { t } = useTranslation();
  const { appData, setValues, setAllowSummary } = useData();
  const appDataValid = validateAppData(appData, "PersonalData");
  const history = useHistory();

  useTitle("Border insurance | FinAgent");

  const { register, handleSubmit, errors } = useForm({
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
    setValues(data, "PersonalData");
    setAllowSummary(true);
    history.push("./summary");
  };

  return (
    <ContentWrap fullWidth>
      <QuestState data={appData} />

      <Page>
        <Title>{t("InsuranceBorder.title")}</Title>
        <ProgressBar maxSteps={3} currentStep={3} label="Personal Info" />
        <Subtitle>{t("InsuranceBorder.Page3.subtitle")}</Subtitle>
        <Form id="form" onSubmit={handleSubmit(formSubmit)}>
          <Input
            ref={register}
            name="name"
            labelName={t("InsuranceBorder.Page3.name")}
            error={!!errors.name}
            helperText={errors?.name?.message}
            autoComplete="given-name"
          />
          <Input
            ref={register}
            name="surname"
            labelName={t("InsuranceBorder.Page3.surname")}
            error={!!errors.surname}
            helperText={errors?.surname?.message}
            autoComplete="family-name"
          />
          <PhoneInput
            ref={register}
            name="phoneNumber"
            labelName={t("InsuranceBorder.Page3.phoneNumber")}
            error={!!errors.phoneNumber}
            helperText={errors?.phoneNumber?.message}
          />
          <Input
            ref={register}
            name="email"
            labelName={t("InsuranceBorder.Page3.email")}
            error={!!errors.email}
            helperText={errors?.email?.message}
            placeholder="example@mail.com"
          />
          <Input
            ref={register}
            name="country"
            labelName={t("InsuranceBorder.Page3.country")}
            type="text"
            error={!!errors.country}
            helperText={errors?.country?.message}
            placeholder="Poland"
          />
          <Input
            ref={register}
            name="city"
            labelName={t("InsuranceBorder.Page3.city")}
            type="text"
            error={!!errors.city}
            helperText={errors?.city?.message}
            placeholder="Warsaw"
          />
          <Input
            ref={register}
            name="postIndex"
            labelName={t("InsuranceBorder.Page3.postIndex")}
            error={!!errors.postIndex}
            helperText={errors?.postIndex?.message}
            placeholder="123-45"
          />
          <Input
            ref={register}
            name="street"
            labelName={t("InsuranceBorder.Page3.street")}
            error={!!errors.street}
            helperText={errors?.street?.message}
            placeholder="Bialostocka"
          />
          <Input
            ref={register}
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
