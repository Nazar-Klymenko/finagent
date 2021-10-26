import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import styled from '@emotion/styled'
import { css } from '@emotion/react'
/macro";

interface Props {
  large?: boolean;
  text: string;
  to: string;
}

interface Styled {
  large?: boolean;
}

const BackButton: React.FC<Props> = ({ large, text, to }) => {
  const history = useHistory();

  const pushHistory = useCallback(() => {
    history.push(`./${to}`);
  }, [history, to]);

  return (
    <BackButtonStyled onClick={pushHistory} large={large}>
      {text}
    </BackButtonStyled>
  );
};

const BackButtonStyled = styled.button<Styled>`
  width: 7rem;
  height: 3rem;
  font-family: inherit;

  background-color: white;
  box-shadow: 0px 1px 4px 0px rgba(127, 8, 251, 0.25);
  border-radius: 5px;
  border: 2px solid ${({ theme }) => theme.blue};

  color: ${({ theme }) => theme.blue};
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.015em;

  ${({ large }) =>
    large &&
    css`
      width: 10rem;
      align-self: center;
    `}

  &:hover {
    box-shadow: 0 1px 2px 0 rgba(66, 133, 244, 0.3),
      0 1px 3px 1px rgba(66, 133, 244, 0.15);
  }
  &:focus {
    box-shadow: 0 0 0 4px #cbd6ee;
  }
  @media all and (max-width: ${({ theme }) => theme.widthPhone}) {
    ${({ large }) =>
      large &&
      css`
        max-width: 7rem;
      `}
  }
`;

export default BackButton;
