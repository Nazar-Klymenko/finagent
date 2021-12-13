import React from "react";

import styled, { css } from "styled-components/macro";

interface Props {
  large?: boolean;
  text: string;
  onClick?: () => void;
  isLoading?: boolean;
  isBlocked?: boolean;
  form: string;
}
interface Styled {
  isLoading?: boolean;
  isBlocked?: boolean;
  large?: boolean;
}
const CTA: React.FC<Props> = ({
  large,
  text,
  onClick,
  isLoading,
  isBlocked,
  form,
}) => {
  return (
    <CTAStyled
      form={form}
      onClick={onClick}
      large={large}
      isLoading={isLoading}
      isBlocked={isBlocked}
    >
      {text}
    </CTAStyled>
  );
};

const CTAStyled = styled.button<Styled>`
  width: ${({ large }) => (large ? "10rem" : "7rem")};
  height: 3rem;
  font-family: inherit;
  background-color: ${({ theme }) => theme.blue};
  box-shadow: 0px 1px 4px 0px rgba(127, 8, 251, 0.25);
  border-radius: 5px;
  border: none;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.015em;
  align-self: ${({ large }) => (large ? "center" : "none")};

  ${({ isLoading }) =>
    isLoading &&
    css`
      cursor: progress;
      pointer-events: none;
      background-color: ${({ theme }) => theme.inactiveBlue};
      &:hover {
        background-color: ${({ theme }) => theme.inactiveBlue} !important;
      }
    `}

  ${({ isBlocked }) =>
    isBlocked &&
    css`
      cursor: not-allowed;
      pointer-events: none;
      background-color: ${({ theme }) => theme.inactiveBlue};
      &:hover {
        background-color: ${({ theme }) => theme.inactiveBlue} !important;
      }
    `}

  &:hover {
    box-shadow: 0 1px 2px 0 rgba(66, 133, 244, 0.3),
      0 1px 3px 1px rgba(66, 133, 244, 0.15);
    background-color: ${({ theme }) => theme.hoverBlue};
  }
  &:focus {
    box-shadow: 0 0 0 4px #cbd6ee;
  }
  @media all and (max-width: ${({ theme }) => theme.widthPhone}) {
    max-width: 7rem;
  }
`;

export default CTA;
