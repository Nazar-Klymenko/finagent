import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { MuiRadio, DateInput } from "@components/input";
import { Controller } from "react-hook-form";

import { CTA } from "@components/buttons";

import { ContentWrap } from "@components/content";
import Form from "@components/Form";
import FileTest from "./FileTest";

const Staging = () => {
  const { t } = useTranslation();

  const { handleSubmit, errors, control, register } = useForm({
    defaultValues: { policyholder: [{ name: "", surname: "" }] },
    mode: "onChange",
    reValidateMode: "onChange",
    shouldFocusError: true,
    // resolver: yupResolver(policyholderSchema),
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormContext)
      name: "policyholder", // unique name for your Field Array
      // keyName: "id", default to "id", you can change the key name
    }
  );
  const formSubmit = (data) => {
    console.log(data);
  };
  return (
    <ContentWrap fullHeight xl>
      <Form id="form" onSubmit={handleSubmit(formSubmit)}>
        <ul>
          {fields.map((item, index) => {
            return (
              <li key={item.id}>
                <input
                  name={`policyholder[${index}].name`}
                  defaultValue={`${item.name}`} // make sure to set up defaultValue
                  ref={register()}
                />

                <Controller
                  as={<input />}
                  name={`policyholder[${index}].surname`}
                  control={control}
                  defaultValue={item.surname} // make sure to set up defaultValue
                />
                <button type="button" onClick={() => remove(index)}>
                  Delete
                </button>
              </li>
            );
          })}
        </ul>
      </Form>
      <CTA text="Next" form="form" color="primary" />
    </ContentWrap>
  );
};

export default Staging;

const policyholderSchema = () => {
  return yup.object().shape({
    name: yup
      .string()
      .matches(/^([^0-9]*)$/, "Form.Error.noNumber")
      .required("Form.Error.blank"),
    surname: yup.string().matches(/^([^0-9]*)$/, "Form.Error.noNumber"),
  });
};

//  {/* <FileTest
//           control={control}
//           name="files"
//           showFiles
//           error={!!errors.files}
//           helperText={errors?.files?.message}
//         /> */}
