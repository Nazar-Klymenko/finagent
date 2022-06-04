import * as React from "react";

import Head from "next/head";

import { Box } from "@mui/material";
import { css, styled } from "@mui/material/styles";

interface Props {
  children: React.ReactElement | React.ReactElement[];
  isLoading: boolean;
  title: string;
}

const AuthContainer = ({
  children,
  isLoading,
  title = "Finagent",
}: Props): JSX.Element => {
  return (
    <BoxStyled isLoading={isLoading}>
      <Head>
        <title>{title} | FinAgent</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {children}
    </BoxStyled>
  );
};

export default AuthContainer;

const BoxStyled = styled(Box)<{ isLoading: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 1.5rem auto;
  padding: 1.5rem;
  height: fit-content;
  max-width: 500px;
  width: 500px;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  ${({ theme }) => theme.breakpoints.down("md")} {
    border: none;
    max-width: 100%;
    height: auto;
    /* min-height: 100%; */
    /* margin: 0 auto; */
    padding: 1.5rem 16px;
  }
  ${({ isLoading }) =>
    isLoading &&
    css`
      border: none;
    `}
`;
