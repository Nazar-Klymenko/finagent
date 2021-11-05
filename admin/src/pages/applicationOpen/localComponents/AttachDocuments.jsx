import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import Form from "@components/Form";
import { CTA } from "@components/buttons";
import Subheader from "@components/Subheader";
import Section from "./Section";

import { uploadDocumentsAPI } from "@api/mainAPI";
import { FileInput } from "@components/input";
import { useDispatch } from "react-redux";
import { setSnackbar } from "@redux/alert/actions";

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
