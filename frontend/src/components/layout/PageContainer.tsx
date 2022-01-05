import * as React from "react";

import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

interface Props {
  xs?: boolean;
  children: any;
}

const PageContainer = ({ children, xs = false }: Props): JSX.Element => {
  return <BoxStyled xs={xs}>{children}</BoxStyled>;
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
