import React, { forwardRef } from "react";

import { parsePhoneNumberFromString } from "libphonenumber-js";

import { InputContainer, Label, InputStyled, InputError } from "./SharedStyles";

interface Props {
  name: string;
  labelName: string;
  error: boolean;
  helperText: string;
  ref: React.Ref<HTMLInputElement>;
}

const PhoneInput: React.FC<Props> = forwardRef(
  ({ name, labelName, error, helperText }, ref) => {
    const normalizePhoneNumber = (value: string) => {
      const phoneNumber = parsePhoneNumberFromString(value);
      if (!phoneNumber) {
        return value;
      }
      console.log(phoneNumber.formatInternational());
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
          placeholder="+XX XXX XXX XXX"
          onChange={(event) => {
            event.target.value = normalizePhoneNumber(event.target.value);
          }}
        />

        <InputError>
          <span className="invis-star">*</span>
          {helperText}
        </InputError>
      </InputContainer>
    );
  }
);

export default PhoneInput;
