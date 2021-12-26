import React from "react";

import { Theme } from "@mui/material";
import { css, styled } from "@mui/material/styles";

interface Props {
  xs?: boolean;
  authForm?: boolean;
  direction?: "column" | "row";
  flipDirection?: boolean;
}

const ContentWrap: React.FC<Props> = ({
  xs,
  children,
  authForm,
  direction,
  flipDirection,
}) => {
  return (
    <ContentWrapStyled
      xs={xs}
      authForm={authForm}
      direction={direction}
      flipDirection={flipDirection}
    >
      {children}
    </ContentWrapStyled>
  );
};

const ContentWrapStyled = styled("div")<Props>`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 1.5rem !important;
  margin: 0 auto;

  border-radius: 6px;
  flex: 1;

  ${(props) => {
    if (props.authForm) {
      return `
      width: 500px;
      max-width: 500px !important;
      border: 1px solid ${({ theme }: any) => theme.palette.divider};
      flex: 0;
      @media all and (max-width: ${({ theme }: any) =>
        theme.breakpoints.values.md}) {
        border: none;
        width: auto;
      }
      `;
    }
  }}

  ${(props) => {
    if (props.flipDirection) {
      return `
      flex-direction: row;
      @media all and (max-width: ${({ theme }: any) =>
        theme.breakpoints.values.md}) {
        flex-direction: column;
        justify-content: flex-start;
        padding: 0 !important;
      }
      `;
    }
  }}
`;

export default ContentWrap;
