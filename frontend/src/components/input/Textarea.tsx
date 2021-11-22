import React from "react";

import { OutlinedInput } from "@material-ui/core";
import { Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
  InputContainer,
  InputErrorMessage,
  Label,
  Optional,
} from "./LocalStyles";

interface Props {
  control: Control<any>;
  name: string;
  labelName: string;
  error: boolean;
  helperText: string | undefined;
  placeholder?: string;
  optional?: boolean;
  rows: string;
  defaultValue?: string | undefined;
}

const Textarea: React.FC<Props> = ({
  name,
  labelName,
  error,
  helperText = "",
  control,
  placeholder,
  optional,
  defaultValue,
}) => {
  const { t } = useTranslation();
  return (
    <InputContainer error={error}>
      <Label htmlFor={name}>
        {labelName}
        {optional && <Optional>{t("Form.optional")}</Optional>}
      </Label>

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <OutlinedInput
            onChange={field.onChange}
            value={field.value}
            multiline
            rows={4}
            rowsMax={8}
            fullWidth
            placeholder={placeholder}
            error={error}
            id={name}
          />
        )}
      />

      <InputErrorMessage>
        <span className="invis-star">*</span>
        {t(helperText)}
      </InputErrorMessage>
    </InputContainer>
  );
};

export default Textarea;
