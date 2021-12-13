import React, { forwardRef } from "react";

import styled from "styled-components/macro";

interface Props {
  name: string;
  labelName: string;
  id: string;
  onClick?: () => void;
  defaultChecked?: boolean;
  ref: React.Ref<HTMLInputElement>;
}

const Radio: React.FC<Props> = forwardRef(
  ({ name, labelName, id, onClick, defaultChecked }, ref) => {
    return (
      <RadioWrap>
        <RadioLabel>
          <RadioInput
            onClick={onClick}
            ref={ref}
            name={name}
            id={id}
            type="radio"
            value={id}
            defaultChecked={defaultChecked}
          />
          {labelName}
        </RadioLabel>
      </RadioWrap>
    );
  }
);

const RadioWrap = styled.div`
  display: inline;
  margin-left: 1rem;
  position: relative;
  margin-bottom: 0.6rem;
`;
const RadioLabel = styled.label`
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 4px;
  &:hover {
    background: ${({ theme }) => theme.lightBlue};
  }
`;
const RadioInput = styled.input`
  margin-right: 1rem;
`;

export default Radio;
