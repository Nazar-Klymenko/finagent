import React, { forwardRef, useState } from "react";
import styled from "styled-components/macro";
import { EyeOpen, EyeClosed } from "@components/svgs";

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
  ref: React.Ref<HTMLInputElement>;
}

const InputPassword: React.FC<Props> = forwardRef(
  ({ name, labelName, error, helperText }, ref) => {
    const [pswdVisible, togglePswdVisible] = useState(false);

    const changeVisibility = () => {
      togglePswdVisible(!pswdVisible);
    };
    return (
      <InputContainer error={error}>
        <Label htmlFor={name}>{labelName}</Label>
        <InputPasswordWrap>
          <InputStyled
            error={error}
            ref={ref}
            name={name}
            id={name}
            type={pswdVisible ? "text" : "password"}
          />
          <Eye onClick={changeVisibility}>
            {pswdVisible ? <EyeClosed /> : <EyeOpen />}
          </Eye>
        </InputPasswordWrap>
        <InputErrorMessage>
          <span className="invis-star">*</span>
          {helperText}
        </InputErrorMessage>
      </InputContainer>
    );
  }
);

const InputPasswordWrap = styled.div`
  position: relative;
`;

const Eye = styled.span`
  position: absolute;
  cursor: pointer;
  right: 0;
  top: 50%;
  transform: translate(-35%, -50%);
  height: 1.5rem;
  width: 1.5rem;
`;

export default InputPassword;
