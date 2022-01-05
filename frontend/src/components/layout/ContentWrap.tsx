import React from "react";

// import styled, { css } from "styled-components/macro";
import styled, { css } from "styled-components/macro";

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

const ContentWrapStyled = styled.div<Props>`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 1.5rem !important;
  margin: 0 auto;

  border-radius: 6px;
  flex: 1;

  ${({ authForm }) =>
    authForm &&
    css`
      width: 500px;
      max-width: 500px !important;
      border: 1px solid ${({ theme }) => theme.border};
      flex: 0;
      @media all and (max-width: ${({ theme }) => theme.widthTablet}) {
        border: none;
        width: auto;
      }
    `}

  ${({ xs }) =>
    xs &&
    css`
      min-width: 680px;
      max-width: 680px;
      @media all and (max-width: ${({ theme }) => theme.widthTablet}) {
        width: 100%;
        min-width: unset;
        max-width: unset;
      }
    `}

    ${({ direction }) =>
    direction === "column" &&
    css`
      flex-direction: column;
      justify-content: flex-start;
    `}

${({ flipDirection }) =>
    flipDirection &&
    css`
      flex-direction: row;
      @media all and (max-width: ${({ theme }) => theme.widthTablet}) {
        flex-direction: column;
        justify-content: flex-start;
        padding: 0 !important;
      }
    `}
`;
export default ContentWrap;
