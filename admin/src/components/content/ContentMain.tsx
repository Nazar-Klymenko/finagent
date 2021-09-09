import React from "react";

import styled from "styled-components/macro";

const ContentMain: React.FC = ({ children }) => {
  return <ContentMainStyled>{children}</ContentMainStyled>;
};

const ContentMainStyled = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 13rem;
  padding: 20px;
`;

export default ContentMain;
