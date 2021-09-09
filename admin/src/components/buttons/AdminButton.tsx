import React from "react";
import styled, { css } from "styled-components/macro";

interface Props {
  red?: boolean;
  loading?: boolean;
  text: string;
  onClick?: () => void;
}

interface Styled {
  red?: boolean;
  loading?: boolean;
}

const CTA: React.FC<Props> = ({ red, loading, text, onClick }) => {
  return (
    <AdminBtn onClick={onClick} loading={loading} red={red}>
      {text}
    </AdminBtn>
  );
};

const AdminBtn = styled.button<Styled>`
  min-width: 180px;
  height: 35px;
  background-color: ${({ theme }) => theme.blue};
  color: white;
  border: unset;
  border-radius: 4px;
  cursor: pointer;
  margin: 0 1rem;
  &:hover {
    opacity: 0.8;
  }
  ${({ loading }) =>
    loading &&
    css`
      cursor: progress;
      opacity: 0.6;
    `}
  ${({ red }) =>
    red &&
    css`
      background-color: ${({ theme }) => theme.red};
    `}
`;

export default CTA;
