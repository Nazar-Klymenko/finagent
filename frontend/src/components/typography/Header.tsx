import React, { FC } from "react";

import styled, { css } from "styled-components/macro";

interface Props {
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  align?: "left" | "center" | "right";
  bottomGutter?: boolean;
}
interface Styled {
  bottomGutter: boolean;
  align: "left" | "center" | "right";
}

const Header: FC<Props> = ({
  children,
  variant,
  bottomGutter = false,
  align = "left",
}) => {
  if (variant === "h1")
    return (
      <H1 align={align} bottomGutter={bottomGutter}>
        {children}
      </H1>
    );
  if (variant === "h2")
    return (
      <H2 align={align} bottomGutter={bottomGutter}>
        {children}
      </H2>
    );
  if (variant === "h3")
    return (
      <H3 align={align} bottomGutter={bottomGutter}>
        {children}
      </H3>
    );
  if (variant === "h4")
    return (
      <H4 align={align} bottomGutter={bottomGutter}>
        {children}
      </H4>
    );
  if (variant === "h5")
    return (
      <H5 align={align} bottomGutter={bottomGutter}>
        {children}
      </H5>
    );
  if (variant === "h6")
    return (
      <H6 align={align} bottomGutter={bottomGutter}>
        {children}
      </H6>
    );
  return (
    <H1 align={align} bottomGutter={bottomGutter}>
      {children}
    </H1>
  );
};

export default Header;

const HeaderBase = styled.h1<Styled>`
  color: ${({ theme }) => theme.typography.black};
  ${({ bottomGutter }) =>
    bottomGutter &&
    css`
      margin-bottom: 32px;
    `}
  line-height:130%;

  ${({ align }) =>
    align === "left" &&
    css`
      text-align: left;
    `}
  ${({ align }) =>
    align === "center" &&
    css`
      text-align: center;
    `}
  ${({ align }) =>
    align === "right" &&
    css`
      text-align: right;
    `}
`;

const H1 = styled(HeaderBase)`
  font-size: 2em;
  font-weight: bolder;
`;
const H2 = styled(HeaderBase)`
  font-size: 1.5em;
  font-weight: bolder;
`;
const H3 = styled(HeaderBase)`
  font-size: 1.17em;
  font-weight: bolder;
`;
const H4 = styled(HeaderBase)`
  font-size: 1em;
  font-weight: bolder;
`;
const H5 = styled(HeaderBase)`
  font-size: 0.83em;
  font-weight: bolder;
`;
const H6 = styled(HeaderBase)`
  font-size: 0.67em;
  font-weight: bolder;
`;
