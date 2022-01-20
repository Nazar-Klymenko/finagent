import * as React from "react";

import { useTranslation } from "next-i18next";
import Head from "next/head";

// import { Box } from "@mui/material";
import { Container } from "@mui/material";
import { styled, css } from "@mui/material/styles";

interface Props {
  xs?: boolean;
  children: any;
  title: string;
}

const PageContainer = ({
  children,
  xs = false,
  title = "Finagent",
}: Props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <BoxStyled xs={xs}>
      <Head>
        <title>{t(title)}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {children}
    </BoxStyled>
  );
};

export default PageContainer;

const BoxStyled = styled("div", {
  shouldForwardProp: (prop) => prop !== "xs",
})<{ xs: boolean }>`
  display: flex;
  flex-direction: column;
  place-content: center flex-start;
  padding: 1.5rem 0;
  width: 100%;
  height: 100%;
  margin: 0px auto;
  flex: 1;
  ${({ xs }) =>
    xs &&
    css`
      margin: 0 auto;
      max-width: 600px;
    `};
`;
