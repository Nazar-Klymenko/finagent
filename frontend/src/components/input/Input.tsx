import React, { forwardRef } from "react";
import {
  InputContainer,
  Label,
  InputStyled,
  InputErrorMessage,
  Optional,
} from "./LocalStyles";
import { useTranslation } from "react-i18next";

interface Props {
  name: string;
  labelName: string;
  error: boolean;
  helperText: string | undefined;
  type: string;
  placeholder: string;
  defaultValue?: any;
  autofocus?: boolean;
  autoComplete?: string;
  ref: React.Ref<HTMLInputElement>;
  optional?: boolean;
}

const Input: React.FC<Props> = forwardRef(
  (
    {
      name,
      labelName,
      error,
      helperText = "",
      type,
      placeholder,
      defaultValue,
      autofocus,
      autoComplete,
      optional,
    },
    ref
  ) => {
    const { t } = useTranslation();

    return (
      <InputContainer error={error}>
        <Label htmlFor={name}>
          {labelName}
          {optional && <Optional>{t("Form.optional")}</Optional>}
        </Label>

        <InputStyled
          ref={ref}
          name={name}
          id={name}
          type={type}
          defaultValue={defaultValue}
          placeholder={placeholder}
          autoFocus={autofocus}
          autoComplete={autoComplete}
          error={error}
        />

        <InputErrorMessage>
          <span className="invis-star">*</span>
          {t(helperText)}
        </InputErrorMessage>
      </InputContainer>
    );
  }
);

export default Input;
