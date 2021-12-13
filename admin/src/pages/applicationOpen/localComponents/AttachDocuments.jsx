import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { uploadDocumentsAPI } from "@api/mainAPI";

import { setSnackbar } from "@redux/alert/actions";

import Form from "@components/Form";
import Subheader from "@components/Subheader";
import { CTA } from "@components/buttons";
import { FileInput } from "@components/input";

import Section from "./Section";

const AttachDocuments = ({ id }) => {
  const { t } = useTranslation();
  const { dispatch } = useDispatch();
  const { handleSubmit, errors, formState, control } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: false,
  });

  const { isDirty } = formState;

  const formSubmit = async (data) => {
    try {
      const formData = new FormData();

      data.adminDocuments.forEach((file) => {
        formData.append("files", file, file.name);
      });

      await uploadDocumentsAPI(formData, id);

      dispatch(setSnackbar("success", "SnackBar.success"));
    } catch (error) {
      dispatch(setSnackbar("error", "SnackBar.error"));
    }
  };

  return (
    <Section isDirty={isDirty}>
      <Subheader
        subheader={t("ApplicationOpen.AttachDocument.title")}
        description={t("ApplicationOpen.AttachDocument.subtitle")}
      />
      <Form id="attach-documents" onSubmit={handleSubmit(formSubmit)}>
        <FileInput
          control={control}
          name="adminDocuments"
          labelName=""
          helperText={errors?.adminDocuments?.message}
          showFiles
        />

        <CTA
          isBlocked={!isDirty}
          text={t("ApplicationOpen.AdminButton.upload")}
          form="attach-documents"
        ></CTA>
      </Form>
    </Section>
  );
};

export default AttachDocuments;
