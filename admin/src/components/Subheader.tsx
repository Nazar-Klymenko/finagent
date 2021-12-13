import React from "react";

import styled, { css } from "styled-components/macro";

interface Props {
  subheader: string;
  description: string;
  compact?: boolean;
}
interface Styled {
  compact: boolean;
}
const Subheader: React.FC<Props> = ({
  subheader,
  description,
  compact = false,
}) => {
  return (
    <SubheaderStyled compact={compact}>
      <span className="subheader">{subheader}</span>
      <span className="description">{description}</span>
    </SubheaderStyled>
  );
};

const SubheaderStyled = styled.div<Styled>`
  width: 100%;
  margin: 2rem 0rem 0.5rem 0rem;
  display: flex;
  flex-direction: column;

  .subheader {
    font-size: 1.1rem;
    font-weight: 500;
    margin-bottom: 0.1rem;
  }
  .description {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.gray};
  }
  ${({ compact }) =>
    compact &&
    css`
      margin: 0rem 0rem 0.5rem 0rem;
    `}
`;

export default Subheader;
