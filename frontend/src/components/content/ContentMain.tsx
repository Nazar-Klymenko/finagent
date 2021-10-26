import React from "react";
import styled, { css } from "styled-components/macro";

import { useAuth } from "@context/authContext";

interface Styled {
  isLoggedIn: boolean;
}

const ContentMain: React.FC = ({ children }) => {
  const { currentUser } = useAuth();
  const { isLoggedIn } = currentUser;
  return (
    <ContentMainStyled isLoggedIn={isLoggedIn}>{children}</ContentMainStyled>
  );
};

const ContentMainStyled = styled.div<Styled>`
  margin: 50px 0 0px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 50px);
  padding: 0 40px;

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
