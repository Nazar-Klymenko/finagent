import * as React from "react";

import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";

interface Props {
  children: any;
}

const MainWrapper = ({ children }: Props): JSX.Element => {
  return (
    <ContainerStyled maxWidth={false} disableGutters>
      {children}
    </ContainerStyled>
  );
};

export default MainWrapper;

const ContainerStyled = styled(Container)`
  height: 100%;
  min-height: calc(100vh - 64px);
  display: flex !important;
  flex-direction: column;
  margin-top: 56px;
  padding-left: 220px;
  flex: 1;

  @media (min-width: 0px) and (orientation: landscape) {
    margin-top: 48px;
  }
  @media (min-width: 600px) {
    margin-top: 64px;
  }
`;
