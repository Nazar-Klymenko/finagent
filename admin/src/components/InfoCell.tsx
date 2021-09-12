import React from "react";
import styled from "styled-components/macro";

interface Props {
  name: string;
  value: string;
}

const InfoCell: React.FC<Props> = ({ name, value }) => {
  return (
    <InfoCellStyled>
      <span className="name">{name + ":"}</span>
      <span className="value">{value}</span>
    </InfoCellStyled>
  );
};

const InfoCellStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 2rem;
  .name {
    color: ${({ theme }) => theme.gray};
  }
`;

export default InfoCell;
