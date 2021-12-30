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
import { MuiButton } from "@components/buttons";
import { MuiInput, MuiPhoneInput } from "@components/input";
import { ContentWrap } from "@components/layout";

import { ButtonsWrap, Page, Subtitle, Title } from "../LocalStyles";
import { pageThreeSchema } from "./applicationHelpers/insurance-border.schema";

type FormTypes = {
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
  country: string;
  city: string;
  postIndex: string;
  street: string;
  houseNumber: string;
};

const Page3 = () => {
  const { t } = useTranslation();
  useTitle("Border insurance | FinAgent");
  const history = useHistory();

  const { appData, setValues, setAllowSummary } = useData();

  const appDataValid = appData.insuranceBorder?.personalData;

  const methods = useForm<FormTypes>({
    defaultValues: {
      name: appDataValid?.name,
      surname: appDataValid?.surname,
      phoneNumber: appDataValid?.phoneNumber,
      email: appDataValid?.email,
      country: appDataValid?.country,
      city: appDataValid?.city,
      postIndex: appDataValid?.postIndex,
      street: appDataValid?.street,
      houseNumber: appDataValid?.houseNumber,
    },
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    resolver: yupResolver(pageThreeSchema),
  });
  const { handleSubmit } = methods;

  const formSubmit = handleSubmit((data) => {
    setValues(data, "insuranceBorder", "personalData");
    setAllowSummary(true);
    history.push("./summary");
  });

  return (
    <ContentWrap>
      <QuestState data={appData} />

      <Page>
        <Title>{t("InsuranceBorder.title")}</Title>
        <ProgressBar
          maxSteps={3}
          currentStep={3}
          label={t("InsuranceBorder.Page3.subtitle")}
        />
        <Subtitle>{t("InsuranceBorder.Page3.subtitle")}</Subtitle>
        <Form methods={methods} id="form" onSubmit={formSubmit}>
          <MuiInput
            name="name"
            labelName={t("InsuranceBorder.Page3.name")}
            autoComplete="given-name"
          />
          <MuiInput
            name="surname"
            labelName={t("InsuranceBorder.Page3.surname")}
            autoComplete="family-name"
          />
          <MuiPhoneInput
            name="phoneNumber"
            labelName={t("InsuranceBorder.Page3.phoneNumber")}
          />
          <MuiInput
            name="email"
            labelName={t("InsuranceBorder.Page3.email")}
            placeholder="example@mail.com"
          />
          <MuiInput
            name="country"
            labelName={t("InsuranceBorder.Page3.country")}
            type="text"
            placeholder="Poland"
          />
          <MuiInput
            name="city"
            labelName={t("InsuranceBorder.Page3.city")}
            type="text"
            placeholder="Warsaw"
          />
          <MuiInput
            name="postIndex"
            labelName={t("InsuranceBorder.Page3.postIndex")}
            placeholder="123-45"
          />
          <MuiInput
            name="street"
            labelName={t("InsuranceBorder.Page3.street")}
            placeholder="Bialostocka"
          />
          <MuiInput
            name="houseNumber"
            labelName={t("InsuranceBorder.Page3.houseNumber")}
            placeholder="14"
          />
        </Form>
        <ButtonsWrap multiple>
          <MuiButton
            text={t("Basic.buttonBack")}
            color="secondary"
            form=""
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
