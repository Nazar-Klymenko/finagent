import React from "react";

import styled, { css } from "styled-components/macro";

interface Props {
  xl?: boolean;
  authForm?: boolean;
  fullHeight?: boolean;
}

const ContentWrap: React.FC<Props> = ({
  xl,
  children,
  authForm,
  fullHeight,
}) => {
  return (
    <ContentWrapStyled xl={xl} fullHeight={fullHeight} authForm={authForm}>
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

  ${({ fullHeight }) =>
    fullHeight &&
    css`
      flex: 1;
      padding-bottom: 90px;
    `}

  ${({ authForm }) =>
    authForm &&
    css`
      max-width: 500px;
    `}



  @media all and (max-width: ${({ theme }) => theme.widthTablet}) {
    width: 80%;
  }

  @media all and (max-width: ${({ theme }) => theme.widthPhone}) {
    flex: 1 1;
    width: auto;
    border-radius: unset;
    margin: 0;
    padding-bottom: 90px;
  }
  @media all and (max-width: ${({ theme }) => theme.widthSmallPhone}) {
    flex: 1 1;
    padding: 2rem 1rem;
    padding-bottom: 90px;
    flex: 1;
    border-radius: unset;
    margin: 0;
    display: flex;
    flex-direction: column;
  }
`;
export default ContentWrap;
