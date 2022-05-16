import { yupResolver } from "@hookform/resolvers/yup";
import { styled } from "@mui/material/styles";
import { ref } from "firebase/storage";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { auth, storage } from "@services/firebase";

import { postAttachmentAPI } from "@api/applications";

import useFileUpload from "@hooks/useFileUpload";

import { DirtySection } from "@components/DirtySection";
import { Form } from "@components/Form";
import { Button } from "@components/buttons";
import { FileInput } from "@components/input";

type FormTypes = {
  adminFiles: File[] | null;
};
interface Props {
  id: any;
  userid: any;
}
const AdminFileInput = ({ id, userid }: Props): JSX.Element => {
  const { progress, running, paused, upload } = useFileUpload();

  const methods = useForm<FormTypes>({
      defaultValues: {
        adminFiles: null,
      },
      mode: "onChange",
      reValidateMode: "onChange",
      shouldFocusError: true,
      shouldUnregister: true,
      resolver: yupResolver(adminFilesSchema),
    }),
    { handleSubmit, watch } = methods;
  const _adminAttachments = watch("adminFiles" || []);

  const formSubmit = handleSubmit(async (data) => {
    const response = await postAttachmentAPI(data, id);

    console.log({ response });
    //@ts-ignore
    _adminAttachments.forEach((file, idx) => {
      const storageRef = ref(
        storage, //@ts-ignore
        `files/${userid}/${response.data.id}/adminAttachments//${response.data.admin_attachments[idx].filename}`
      );
      //@ts-ignore
      upload(storageRef, file);
    });

    alert("files added");
  });
  return (
    <>
      <Form methods={methods} id="admin-attachments" onSubmit={formSubmit}>
        {/* @ts-ignore */}
        {_adminAttachments?.length > 0 && <DirtySection />}
        <FileInput name="adminFiles" labelName="" defaultValue={null} />
        {/* @ts-ignore */}
        {_adminAttachments?.length > 0 && (
          <Button form="admin-attachments">Send documents</Button>
        )}
      </Form>
    </>
  );
};

export { AdminFileInput };

const adminFilesSchema = yup.object().shape({
  adminFiles: yup
    .array()
    .nullable()
    .required("Form.Error.blank")
    .min(1, "minimalnie 1 plik")
    .max(5, "maksymalnie 5 plików")
    .test(
      "is-big-file",
      "maksymalny rozmiar pliku to 5MB",
      checkIfFilesAreTooBig
    )
    .test(
      "is-correct-file",
      "nieodpowiedni typ plików",
      checkIfFilesAreCorrectType
    ),
});
function checkIfFilesAreTooBig(files: any) {
  let valid = true;
  if (files) {
    files.forEach((file: any) => {
      const size = file.size / 1024 / 1024;
      if (size > 5) {
        valid = false;
      }
    });
  }
  return valid;
}

function checkIfFilesAreCorrectType(files: any) {
  let valid = true;
  if (files) {
    files.forEach((file: any) => {
      if (!["application/pdf", "image/jpeg", "image/png"].includes(file.type)) {
        valid = false;
      }
    });
  }
  return valid;
}
