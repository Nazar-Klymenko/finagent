import * as React from "react";

import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

interface Props {
  children: any;
}

const AuthContainer = ({ children }: Props): JSX.Element => {
  return <BoxStyled>{children}</BoxStyled>;
};

export default AuthContainer;

const BoxStyled = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: auto auto;
  padding: 1.5rem;
  height: fit-content;
  max-width: 500px;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  ${({ theme }) => theme.breakpoints.down("md")} {
    border: none;
    /* margin: 0 auto; */
    padding: 1.5rem 0;
  }
`;
