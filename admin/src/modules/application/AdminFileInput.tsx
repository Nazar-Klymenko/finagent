import { yupResolver } from "@hookform/resolvers/yup";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { Form } from "@components/Form";
import { Button } from "@components/buttons";
import { FileInput } from "@components/input";

type FormTypes = {
  adminFiles: File[] | null;
};
const AdminFileInput = (): JSX.Element => {
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

  const formSubmit = handleSubmit((data) => {
    alert("files added");
  });
  return (
    <>
      <Form methods={methods} id="admin-attachments" onSubmit={formSubmit}>
        {/* @ts-ignore */}
        {_adminAttachments?.length > 0 && <VLine />}
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

const VLine = styled("div")`
  background: ${({ theme }) => theme.palette.primary.main};
  width: 3px;
  border-radius: 5px;
  position: absolute;
  left: -8px;
  bottom: 0;
  top: 0;
`;

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
