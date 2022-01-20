import React from "react";

import { NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

// import { QuestState } from "@dev/QuestState";
import { FormProvider, useForm } from "react-hook-form";

// import useTitle from "@hooks/useTitle";
import Form from "@components/Form";
import { Button } from "@components/buttons";
import {
  DateInput, // MuiCheckbox,
  FileInput,
  Input,
  MuiPhoneInput, // MuiRadio,
  // MuiSelect,
} from "@components/input";
import { PageContainer } from "@components/layout";

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

const Dev = () => {
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
  });

  return (
    <PageContainer xs title="InsuranceTransport.title">
      <Form methods={methods} id="form-transport" onSubmit={formSubmit}>
        <FileInput
          name="files"
          labelName={t("InsuranceTransport.Page5.driversLicence")}
        />
        <DateInput
          name="drivingLicenceDate"
          labelName={t("InsuranceTransport.Page1.drivingLicenceDate")}
          placeholder={t("Form.Placeholder.dateFull")}
          disableFuture
          view={["year", "month", "day"]}
        />
      </Form>
      <Button form="form-transport" color="primary">
        {t("Basic.buttonNext")}
      </Button>
    </PageContainer>
  );
};

export default Dev;

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
