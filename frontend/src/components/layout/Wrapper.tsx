import * as React from "react";

import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";

interface Props {
  children: any;
}

const Wrapper = ({ children }: Props): JSX.Element => {
  return <ContainerStyled maxWidth="lg">{children}</ContainerStyled>;
};

export default Wrapper;

const ContainerStyled = styled(Container)`
  min-height: calc(100% - 64px);
  height: calc(100% - 64px);
  display: flex !important;
  flex-direction: column;
  margin-top: 64px;
`;
