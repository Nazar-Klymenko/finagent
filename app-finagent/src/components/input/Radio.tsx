import React, { forwardRef } from "react";
import styled from "styled-components/macro";

interface Props {
  name: string;
  labelName: string;
  onClick?: () => void;
  defaultChecked?: boolean;
  ref: React.Ref<HTMLInputElement>;
  value: string;
}

interface Group {
  name: string;
  defaultChecked?: string;
  ref: React.Ref<HTMLInputElement>;
  value: string;
  options: [{ label: string; value: string }];
  legend: string;
}

const Radio: React.FC<Props> = forwardRef(
  ({ name, labelName, onClick, defaultChecked, value }, ref) => {
    return (
      <RadioContainer>
        <RadioLabel>
          <RadioInput
            onClick={onClick}
            ref={ref}
            name={name}
            type="radio"
            value={value}
            defaultChecked={defaultChecked}
          />
          {labelName}
        </RadioLabel>
      </RadioContainer>
    );
  }
);

const RadioGroup: React.FC<Group> = forwardRef(
  ({ name, defaultChecked, options, legend }, ref) => {
    return (
      <>
        <Legend>{legend}</Legend>
        {options.map((option, idx) => (
          <RadioContainer key={idx}>
            <RadioLabel>
              <RadioInput
                ref={ref}
                name={name}
                type="radio"
                value={option.value}
                defaultChecked={defaultChecked === option.value ? true : false}
              />
              {option.label}
            </RadioLabel>
          </RadioContainer>
        ))}
      </>
    );
  }
);

const RadioContainer = styled.div`
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
const Legend = styled.div`
  font-size: 0.9rem;
`;

export { Radio, RadioGroup };
