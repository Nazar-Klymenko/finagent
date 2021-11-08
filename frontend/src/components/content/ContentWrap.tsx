import React from "react";
import styled, { css } from "styled-components/macro";

interface Props {
  fullWidth?: boolean;
  xs?: boolean;
  xl?: boolean;
  authForm?: boolean;
  fullHeight?: boolean;
  direction?: "column" | "row";
  flipDirection?: boolean;
  P0?: boolean;
  blank?: boolean;
}

const ContentWrap: React.FC<Props> = ({
  fullWidth,
  xs,
  xl,
  children,
  authForm,
  fullHeight,
  direction,
  flipDirection,
  P0,
  blank,
}) => {
  return (
    <ContentWrapStyled
      xl={xl}
      xs={xs}
      fullWidth={fullWidth}
      fullHeight={fullHeight}
      authForm={authForm}
      direction={direction}
      flipDirection={flipDirection}
      P0={P0}
      blank={blank}
    >
      {children}
    </ContentWrapStyled>
  );
};

const ContentWrapStyled = styled.div<Props>`
  height: 100%;
  border: 1px solid ${({ theme }) => theme.border};

  width: ${({ xl }) => (xl ? "70%" : "50%")};

  display: flex;
  justify-content: center;
  align-content: center;
  padding: 1.5rem 0 !important;
  margin: 1.5rem auto;

  background-color: #ffffff;
  /* box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.08); */
  box-shadow: none;
  border-radius: 6px;
  max-width: 1080px;
  @media (min-width: 1200px) {
    max-width: 1200px;
  }

  ${({ fullHeight }) =>
    fullHeight &&
    css`
      flex: 1;
      padding-bottom: 90px;
      border-radius: 0px;
      border: none;
    `}

  ${({ authForm }) =>
    authForm &&
    css`
      min-width: 500px !important;
      max-width: 500px !important;
      padding-left: 2rem !important;
      padding-right: 2rem !important;
      @media all and (max-width: ${({ theme }) => theme.widthPhone}) {
        min-width: unset !important;
      }
    `}


    ${({ xs }) =>
    xs &&
    css`
      min-width: 680px;
      max-width: 680px;
      border: none;
      border-radius: 0px;
      margin: 0;
      flex: 1;
      @media all and (max-width: ${({ theme }) => theme.widthTablet}) {
        min-width: unset;
        max-width: unset;
        width: 100% !important;
      }
    `}
    ${({ fullWidth }) =>
    fullWidth &&
    css`
      margin: 0;
      flex: 1;
      width: 100% !important;
      border-radius: 0px;
      border: none;
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
      }
    `}


  @media all and (min-width: ${({ theme }) => theme.widthDesktop}) {
    width: auto;
    /* border: none; */
    box-shadow: none;
  }

  @media all and (max-width: ${({ theme }) => theme.widthTablet}) {
    width: auto;
    border: none;
    padding: 1.5rem 20px !important;
  }

  @media all and (max-width: ${({ theme }) => theme.widthPhone}) {
    width: auto;
    flex: 1;
    max-width: 100%;
    border-radius: unset;
    margin: 0;
  }
  @media all and (max-width: ${({ theme }) => theme.widthSmallPhone}) {
    flex: 1 1;
    padding: 2rem 1rem;
    flex: 1;
    border-radius: unset;
    margin: 0;
    display: flex;
    flex-direction: column;
  }

  ${({ P0 }) =>
    P0 &&
    css`
      @media all and (max-width: ${({ theme }) => theme.widthTablet}) {
        padding: 0 !important;
      }
    `}

  ${({ blank }) =>
    blank &&
    css`
      box-shadow: none;
    `}
`;
export default ContentWrap;
