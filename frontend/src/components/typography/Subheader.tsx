import React from "react";
import styled from "styled-components/macro";

interface Props {
  subheader: string;
  description: string;
}

const Subheader: React.FC<Props> = ({ subheader, description }) => {
  return (
    <SubheaderStyled>
      <span className="subheader">{subheader}</span>
      <span className="description">{description}</span>
    </SubheaderStyled>
  );
};

const SubheaderStyled = styled.div`
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
    color: ${({ theme }) => theme.typography.gray};
  }
`;

export default Subheader;
