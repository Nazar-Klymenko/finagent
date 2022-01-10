import * as React from "react";
import Head from "next/head";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "next-i18next";

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

const BoxStyled = styled(Box)<{ xs: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  padding: 1.5rem;
  height: 100%;
  max-width: ${({ xs }) => (xs ? "600px" : "unset")};
`;
