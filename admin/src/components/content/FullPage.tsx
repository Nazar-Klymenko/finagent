import React from "react";

import styled from "styled-components/macro";

const FullPage: React.FC = ({ children }) => {
  return <FullPageStyled>{children}</FullPageStyled>;
};

// const FullPageStyled = styled.div`
//   flex: 1 1;
//   height: 100%;
//   background-color: white;
//   padding: 20px;
// `;

const FullPageStyled = styled.div`
  height: 100%;
  width: auto;
  background: white;
  display: flex;
  flex: 1 1;
  overflow-x: auto;
  flex-direction: column;
  border-radius: 4px;
  /* box-shadow: 1px 1px 8px 0px rgba(0, 0, 0, 0.1);
   */
  box-shadow: 0 5px 25px 0 rgba(0, 0, 0, 0.15);
  padding: 16px;
  &::-webkit-scrollbar {
    width: 0.6em;
    height: 0.6rem;
    padding: 10px 2px;
    background: white;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: ${({ theme }) => theme.lightGray};
  }
  &::-webkit-scrollbar-track {
    padding: 8px;
  }
`;

export default FullPage;
