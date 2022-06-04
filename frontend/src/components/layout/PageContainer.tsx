import * as React from "react";

import Head from "next/head";

// import { Box } from "@mui/material";
import { css, styled } from "@mui/material/styles";

interface Props {
  xs?: boolean;
  dashboard?: boolean;
  children: any;
  title: string;
}

const PageContainer = ({
  children,
  xs = false,
  dashboard,
  title = "Finagent",
}: Props): JSX.Element => {
  return (
    <BoxStyled xs={xs} dashboard={dashboard}>
      <Head>
        <title>{title} | FinAgent</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {children}
    </BoxStyled>
  );
};

export default PageContainer;

const BoxStyled = styled("div", {
  shouldForwardProp: (prop) => prop !== "xs" && prop !== "dashboard",
})<{ xs: boolean; dashboard?: boolean }>`
  display: flex;
  flex-direction: column;
  place-content: center flex-start;
  padding: 1.5rem 0;
  width: 100%;
  height: 100%;
  min-height: 100%;

  margin: 0px auto;
  flex: 1;
  padding-left: 16px;
  padding-right: 16px;

  ${({ xs }) =>
    xs &&
    css`
      margin: 0 auto;
      max-width: 600px;
    `};
  ${({ dashboard, theme }) =>
    dashboard &&
    css`
      ${theme.breakpoints.down("md")} {
        padding: 0 0;
      }
    `};
`;
