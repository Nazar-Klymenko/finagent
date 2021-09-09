import React, { forwardRef } from "react";
import styled from "styled-components";
import { Label } from "./LocalStyles";

interface Props {
  name: string;
  labelName: string;
  checked: boolean;
  readOnly: boolean;
  onChange: () => void;
  ref: React.Ref<HTMLInputElement>;
}

const Checkbox: React.FC<Props> = forwardRef(
  ({ name, labelName, checked, readOnly, onChange }, ref) => {
    return (
      <CheckBoxContainer>
        <Label htmlFor={name}>
          <input
            ref={ref}
            className="checkbox"
            name={name}
            readOnly={readOnly}
            checked={checked}
            id={name}
            type="checkbox"
            onChange={onChange}
          />
          {labelName}
        </Label>
      </CheckBoxContainer>
    );
  }
);

const CheckBoxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.6rem;
  .input-label {
    cursor: pointer;
  }
  input {
    margin-right: 1rem;
  }
`;

export default Checkbox;
