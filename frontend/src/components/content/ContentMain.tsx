import React from "react";
import styled, { css } from "styled-components/macro";

import { useSelector } from "react-redux";

interface Styled {
  isLoggedIn: boolean;
}

const ContentMain: React.FC = ({ children }) => {
  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);

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

  @media screen and (max-width: ${({ theme }) => theme.widthTablet}) {
    ${({ isLoggedIn }) =>
      isLoggedIn &&
      css`
        min-height: auto;
        margin: 50px 0 0px;
      `}
  }
`;

export default ContentMain;
