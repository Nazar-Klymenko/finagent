import React from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { getAllLanguageSlugs, getLanguage } from "@lib/i18n";
import i18next from "i18next";
import _ from "lodash";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Form } from "@components/Form";
import { Button } from "@components/buttons";
import { PasswordInput } from "@components/input";
import { PageContainer } from "@components/layout";

type FormTypes = {
  password: string;
};

const Dev = () => {
  const { t } = i18next;

  const methods = useForm<FormTypes>({
      defaultValues: {
        password: "",
      },
      mode: "onChange",
      reValidateMode: "onChange",
      shouldFocusError: true,
      criteriaMode: "all",
      resolver: yupResolver(schema, { abortEarly: false }),
    }),
    { handleSubmit, watch } = methods;

  const formSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <PageContainer xs title={t("insuranceTransport.title")}>
      <Form methods={methods} id="form-pass" onSubmit={formSubmit}>
        <PasswordInput
          name="password"
          labelName="password"
          autoComplete="new-password"
        />
      </Form>
      <Button form="form-pass" color="primary">
        {t("Basic.buttonNext")}
      </Button>
    </PageContainer>
  );
};

export default Dev;

export async function getStaticPaths() {
  const paths = getAllLanguageSlugs();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const language = getLanguage(params.lang);
  return {
    props: {
      language,
    },
  };
}

const schema = yup.object().shape({
  password: yup
    .string()
    .required("Form.Error.blank")
    .min(8, "The password has to be at lest 8 symbols"),
});
