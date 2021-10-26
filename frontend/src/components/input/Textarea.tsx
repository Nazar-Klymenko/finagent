import React, { forwardRef } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import {
  InputContainer,
  Label,
  InputErrorMessage,
  InputStyled,
} from "./LocalStyles";
import { useTranslation } from "react-i18next";

interface Props {
  name: string;
  labelName: string;
  error: boolean;
  helperText: string;
  rows: number;
  placeholder: string;
  ref: React.Ref<HTMLTextAreaElement>;
}

interface Styled {
  error: boolean;
}

const Textarea: React.FC<Props> = forwardRef(
  ({ name, labelName, error, helperText, rows, placeholder }, ref) => {
    const { t } = useTranslation();
    return (
      <InputContainer error={error}>
        <Label htmlFor={name}>{labelName}</Label>
        <TextareaStyled
          as="textarea"
          ref={ref}
          name={name}
          id={name}
          rows={rows}
          placeholder={placeholder}
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

const TextareaStyled = styled(InputStyled)<Styled>`
  position: relative;
  width: 100%;
  resize: none;
  height: unset;
  appearance: none;
`;

export default Textarea;
