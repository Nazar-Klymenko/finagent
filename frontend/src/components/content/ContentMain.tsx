import React from "react";

import Container, { ContainerProps } from "@material-ui/core/Container";
import styled, { css } from "styled-components/macro";

import { useAuth } from "@context/authContext";

interface Styled extends ContainerProps {
  isLoggedIn: boolean;
  children: any;
}

const ContentMain: React.FC = ({ children }) => {
  const { currentUser } = useAuth();
  const { isLoggedIn } = currentUser;
  return (
    <ContainerStyled maxWidth="lg" disableGutters isLoggedIn={isLoggedIn}>
      {children}
    </ContainerStyled>
  );
};

const ContainerStyled = styled(Container)<Styled>`
  margin: 50px auto 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 50px);

  @media screen and (max-width: ${({ theme }) => theme.widthTablet}) {
    padding: 0 0;
    ${({ isLoggedIn }) =>
      isLoggedIn &&
      css`
        min-height: auto;
        margin: 50px 0 0px;
      `}
  }
`;

export default ContentMain;
