import { useRouter } from "next/router";

import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { QuestState } from "@helpers/QuestState";

import { useData } from "@context/dataContext";

import { Form } from "@components/Form";
import { FormBuilder } from "@components/FormBuilder";
import { ProgressBar } from "@components/ProgressBar";
import { Button } from "@components/buttons";
import { Input, MuiPhoneInput } from "@components/input";
import { PageContainer } from "@components/layout";

import { pageThreeSchema } from "./helpers/schema";

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
  const router = useRouter();

  const { appData, setValues, setAllowSummary } = useData();

  const appDataValid = appData.insuranceBorder.personalData;

  const methods = useForm<FormTypes>({
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
    reValidateMode: "onChange",
    shouldFocusError: true,
    shouldUnregister: true,
    resolver: yupResolver(pageThreeSchema),
  });
  const { handleSubmit } = methods;

  const formSubmit = handleSubmit((data) => {
    setValues(data, "insuranceBorder", "personalData");
    setAllowSummary(true);
    router.push("./summary");
  });

  return (
    <PageContainer xs title="insuranceBorder.title">
      <QuestState data={appData} />

      <Typography variant="h4">{t("insuranceBorder.title")}</Typography>
      <ProgressBar
        maxSteps={3}
        currentStep={3}
        label={t("insuranceBorder.Page3.subtitle")}
      />
      <Typography variant="h6">
        {t("insuranceBorder.Page3.subtitle")}
      </Typography>
      <Form methods={methods} id="form" onSubmit={formSubmit}>
        <Input
          name="name"
          labelName={t("insuranceBorder.Page3.name")}
          autoComplete="given-name"
        />
        <Input
          name="surname"
          labelName={t("insuranceBorder.Page3.surname")}
          autoComplete="family-name"
        />
        <MuiPhoneInput
          name="phoneNumber"
          labelName={t("insuranceBorder.Page3.phoneNumber")}
        />
        <Input
          name="email"
          labelName={t("insuranceBorder.Page3.email")}
          placeholder="example@mail.com"
        />
        <Input
          name="country"
          labelName={t("insuranceBorder.Page3.country")}
          type="text"
          placeholder="Poland"
        />
        <Input
          name="city"
          labelName={t("insuranceBorder.Page3.city")}
          type="text"
          placeholder="Warsaw"
        />
        <Input
          name="postIndex"
          labelName={t("insuranceBorder.Page3.postIndex")}
          placeholder="123-45"
        />
        <Input
          name="street"
          labelName={t("insuranceBorder.Page3.street")}
          placeholder="Bialostocka"
        />
        <Input
          name="houseNumber"
          labelName={t("insuranceBorder.Page3.houseNumber")}
          placeholder="14"
        />
      </Form>
      <FormBuilder.ButtonsWrap multiple>
        <Button
          color="secondary"
          form=""
          onClick={() => {
            router.push("./2");
          }}
        >
          {t("Basic.buttonBack")}
        </Button>
        <Button form="form" color="primary">
          {t("Basic.buttonNext")}
        </Button>
      </FormBuilder.ButtonsWrap>
    </PageContainer>
  );
};

export default Page3;
