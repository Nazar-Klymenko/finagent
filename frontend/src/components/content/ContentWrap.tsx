import React from "react";
import styled, { css } from "styled-components/macro";

interface Props {
  fullWidth?: boolean;
  xl?: boolean;
  authForm?: boolean;
  fullHeight?: boolean;
  direction?: "column" | "row";
  flipDirection?: boolean;
  P0?: boolean;
}

const ContentWrap: React.FC<Props> = ({
  fullWidth,
  xl,
  children,
  authForm,
  fullHeight,
  direction,
  flipDirection,
  P0,
}) => {
  return (
    <ContentWrapStyled
      xl={xl}
      fullWidth={fullWidth}
      fullHeight={fullHeight}
      authForm={authForm}
      direction={direction}
      flipDirection={flipDirection}
      P0={P0}
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
  padding: 1.5rem 2rem;
  margin: 1.5rem auto;

  background-color: #ffffff;
  box-shadow: 0px 6px 30px 0px rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  max-width: 1400px;

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
      max-width: 500px;
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
    `}

${({ flipDirection }) =>
    flipDirection &&
    css`
      flex-direction: row;
      @media all and (max-width: ${({ theme }) => theme.widthTablet}) {
        flex-direction: column;
      }
    `}


  @media all and (min-width: ${({ theme }) => theme.widthDesktop}) {
    width: auto;
    border: none;
    box-shadow: none;
  }

  @media all and (max-width: ${({ theme }) => theme.widthTablet}) {
    width: auto;
    border: none;
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
`;
export default ContentWrap;
