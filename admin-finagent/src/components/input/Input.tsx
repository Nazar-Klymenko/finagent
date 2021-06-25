import React, { forwardRef } from "react";
import {
  InputContainer,
  Label,
  InputStyled,
  InputErrorMessage,
} from "./SharedStyles";

interface Props {
  name: string;
  labelName: string;
  error: boolean;
  helperText: string;
  type: string;
  placeholder: string;
  defaultValue?: any;
  autofocus: boolean;
  autoComplete?: string;
  ref: React.Ref<HTMLInputElement>;
}

const Input: React.FC<Props> = forwardRef(
  (
    {
      name,
      labelName,
      error,
      helperText,
      type,
      placeholder,
      defaultValue,
      autofocus,
      autoComplete,
    },
    ref
  ) => {
    return (
      <InputContainer error={error}>
        <Label htmlFor={name}>{labelName}</Label>
        <InputStyled
          ref={ref}
          name={name}
          id={name}
          type={type}
          defaultValue={defaultValue}
          placeholder={placeholder}
          autoFocus={autofocus}
          autoComplete={autoComplete}
        />

        <InputErrorMessage>
          <span className="invis-star">*</span>
          {helperText}
        </InputErrorMessage>
      </InputContainer>
    );
  }
);

export default Input;
