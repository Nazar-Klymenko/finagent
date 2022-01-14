import * as React from "react";

import { useTranslation } from "next-i18next";
import Head from "next/head";

// import { Box } from "@mui/material";
import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";

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
    <BoxStyled disableGutters maxWidth={false} xs={xs}>
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

const BoxStyled = styled(Container)<{ xs: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  padding: 1.5rem;
  height: 100%;
  max-width: ${({ xs }) => (xs ? "600px" : "unset")};
`;
