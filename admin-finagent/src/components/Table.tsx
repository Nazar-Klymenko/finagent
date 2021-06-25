import React from "react";
import styled from "styled-components/macro";

const Table: React.FC = ({ children }) => {
  return <TableStyled>{children}</TableStyled>;
};

const TableStyled = styled.table`
  border-spacing: 0;
  min-width: max-content;
  font-size: 0.8rem;
  border-radius: 4px;
  overflow: hidden;

  thead {
    background: ${({ theme }) => theme.bg};
  }
  th {
    text-align: left;
    padding: 8px;
    font-weight: 500;
  }
  tbody {
    background-color: white;
  }
  tr {
    cursor: pointer;
    box-shadow: 0 1px 0 0px ${({ theme }) => theme.lightestGray};
    max-height: 2rem;
  }
  td {
    padding: 8px;
  }
`;

export default Table;
