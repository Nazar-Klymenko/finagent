import React, { useState, useEffect } from "react";
import styled from "styled-components/macro";
import { Plus } from "@components/svgs";

interface Props {
  id: string;
  employee: { name: string };
  assignApplication: (id: string) => void;
}

const AssignCell: React.FC<Props> = ({ id, employee, assignApplication }) => {
  const [taken] = useState(!!employee);

  return !taken ? (
    <td
      onClick={(e) => {
        e.stopPropagation();
        assignApplication(id);
      }}
    >
      <PlusWrap>
        <Plus />
      </PlusWrap>
    </td>
  ) : (
    <td>{employee?.name}</td>
  );
};

const PlusWrap = styled.div`
  cursor: pointer;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.6rem;
  width: 1.6rem;
  &:hover {
    background: ${({ theme }) => theme.lightGray};
  }
`;

export default AssignCell;
