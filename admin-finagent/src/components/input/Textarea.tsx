import React, { forwardRef } from "react";
import styled from "styled-components";
import { InputContainer, Label, InputErrorMessage } from "./SharedStyles";

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
    return (
      <InputContainer error={error}>
        <Label htmlFor={name}>{labelName}</Label>
        <TextareaStyled
          ref={ref}
          name={name}
          id={name}
          rows={rows}
          placeholder={placeholder}
          error={error}
        />

        <InputErrorMessage>
          <span className="invis-star">*</span>
          {helperText}
        </InputErrorMessage>
      </InputContainer>
    );
  }
);

const TextareaStyled = styled.textarea<Styled>`
  position: relative;
  width: 100%;
  resize: none;

  padding: 5px 8px;
  appearance: none;
  background: white;
  border: 1px solid
    ${({ error, theme }) => (error ? theme.red : theme.inputBorder)};
  box-shadow: "0px 0px 0px 1px"
    ${({ error, theme }) => (error ? theme.red : theme.blue)};
  box-sizing: border-box;
  border-radius: 5px;
  &:focus {
    overflow: hidden;
    border: 1px solid ${({ theme }) => theme.blue};
    box-shadow: 0px 0px 0px 1px ${({ theme }) => theme.blue};
  }
`;

export default Textarea;
