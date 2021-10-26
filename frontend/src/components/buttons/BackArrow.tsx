import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

import styled from "styled-components/macro";

import { ArrowDown } from "@components/svgs";

interface Props {
  returnTo: string;
}

const BackArrow: React.FC<Props> = ({ returnTo }) => {
  const history = useHistory();

  const returnFn = useCallback(() => {
    history.push(returnTo);
  }, [returnTo, history]);

  return (
    <BackArrowStyled onClick={returnFn}>
      <ArrowDown fill="#1a1b1e" rotation={90} width="16" height="10" />
    </BackArrowStyled>
  );
};

const BackArrowStyled = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border-radius: 999px;
  height: 1.8rem;
  width: 1.8rem;
  transition: 0.1s background-color ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.lightGray};
  }
`;

export default BackArrow;
