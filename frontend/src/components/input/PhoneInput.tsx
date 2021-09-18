import React, { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { parsePhoneNumberFromString } from "libphonenumber-js";

import {
  InputContainer,
  Label,
  InputStyled,
  InputErrorMessage,
} from "./LocalStyles";

interface Props {
  name: string;
  labelName: string;
  error: boolean;
  helperText: string;
  placeholder?: string;
  ref: React.Ref<HTMLInputElement>;
  defaultValue: string;
}

const PhoneInput: React.FC<Props> = forwardRef(
  ({ name, labelName, error, helperText, defaultValue }, ref) => {
    const { t } = useTranslation();
    const normalizePhoneNumber = (value: string) => {
      const phoneNumber = parsePhoneNumberFromString(value);
      if (!phoneNumber) {
        return value;
      }
      return phoneNumber.formatInternational();
    };

    return (
      <InputContainer error={error}>
        <Label htmlFor={name}>{labelName}</Label>
        <InputStyled
          ref={ref}
          name={name}
          id={name}
          type="tel" // maxLength={15}
          error={error}
          placeholder="+XX XXX XXX XXX"
          defaultValue={defaultValue}
          onChange={(event: { target: { value: string } }) => {
            event.target.value = normalizePhoneNumber(event.target.value);
          }}
        />

        <InputErrorMessage>
          <span className="invis-star">*</span>
          {t(helperText)}
        </InputErrorMessage>
      </InputContainer>
    );
  }
);

export default PhoneInput;
