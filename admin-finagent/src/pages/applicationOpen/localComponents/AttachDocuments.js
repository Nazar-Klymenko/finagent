import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import Form from "@components/Form";
import { CTA } from "@components/buttons";
import Subheader from "@components/Subheader";
import Section from "./Section";

import { uploadDocumentsAPI } from "@api/mainAPI";

const AttachDocuments = ({ id }) => {
  const { t } = useTranslation();
  const [fileNames, setFileNames] = useState("");
  const { register, handleSubmit, errors, formState } = useForm({
    defaultValues: {
      documents: null,
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
    shouldFocusError: false,
  });

  const { isDirty } = formState;

  const formSubmit = async (data) => {
    try {
      const formData = new FormData();
      // formData.append("picture", data.picture[0]);

      for (let x = 0; x < data.picture.length; x++) {
        formData.append("documents", data.picture[x]);
      }
      uploadDocumentsAPI(formData, id);
      console.log(formData);
      alert("image added successfully");
    } catch (error) {
      alert("couldn't add images");
    }
  };

  return (
    <Section isDirty={isDirty}>
      <Subheader
        subheader={t("ApplicationOpen.AttachDocument.title")}
        description={t("ApplicationOpen.AttachDocument.subtitle")}
      />
      <Form id="attach-documents" onSubmit={handleSubmit(formSubmit)}>
        <input
          ref={register}
          type="file"
          name="picture"
          className="plztest"
          multiple
        />

        <CTA
          isBlocked={!isDirty}
          text={t("ApplicationOpen.AdminButton.upload")}
          form="attach-documents"
        >
          {fileNames}
        </CTA>
      </Form>
    </Section>
  );
};

export default AttachDocuments;
