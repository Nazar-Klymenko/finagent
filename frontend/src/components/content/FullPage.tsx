import React from "react";
import styled from "styled-components/macro";

const FullPage: React.FC = ({ children }) => {
  return <FullPageStyled>{children}</FullPageStyled>;
};

const FullPageStyled = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

export default FullPage;
