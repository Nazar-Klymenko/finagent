import { useRouter } from "next/router";

import { yupResolver } from "@hookform/resolvers/yup";
import { getAllLanguageSlugs, getLanguage } from "@lib/i18n";
import { Typography } from "@mui/material";
import i18next from "i18next";
import { useForm } from "react-hook-form";

import { QuestState } from "@helpers/QuestState";

import { useData } from "@context/dataContext";

import { Form } from "@components/Form";
import { FormBuilder } from "@components/FormBuilder";
import { ProgressBar } from "@components/ProgressBar";
import { Button } from "@components/buttons";
import { Input, MuiPhoneInput } from "@components/input";
import { PageContainer } from "@components/layout";

import { pageThreeSchema } from "./helpers/schema";

import { InsuranceBorderPersonalData } from "@_types/dataContext";

interface FormTypes extends InsuranceBorderPersonalData {}

const Page3 = () => {
  const { t } = i18next;
  const router = useRouter();

  const { appData, setValues, setAllowSummary } = useData();

  const appDataValid = appData.insuranceBorder.personalData;

  const methods = useForm<FormTypes>({
    defaultValues: {
      name: appDataValid.name,
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
    <PageContainer xs title={t("insuranceBorder.title")}>
      <QuestState data={appData} />

      <Typography variant="h4">{t("insuranceBorder.title")}</Typography>
      <ProgressBar
        maxSteps={3}
        currentStep={3}
        label={t("insuranceBorder.Page3.subtitle")}
      />
      <Typography variant="h6" gutterBottom>
        {t("insuranceBorder.Page3.subtitle")}
      </Typography>
      <Form methods={methods} id="form" onSubmit={formSubmit}>
        <Input
          name="name"
          labelName={t("insuranceBorder.Page3.name")}
          autoComplete="name"
        />

        <MuiPhoneInput
          name="phoneNumber"
          labelName={t("insuranceBorder.Page3.phoneNumber")}
        />
        <Input name="email" labelName={t("insuranceBorder.Page3.email")} />
        <Input
          name="country"
          labelName={t("insuranceBorder.Page3.country")}
          type="text"
        />
        <Input
          name="city"
          labelName={t("insuranceBorder.Page3.city")}
          type="text"
        />
        <Input
          name="postIndex"
          labelName={t("insuranceBorder.Page3.postIndex")}
        />
        <Input name="street" labelName={t("insuranceBorder.Page3.street")} />
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
