import { FC } from "react";
import styled from "styled-components/macro";

const PageContainer: FC = ({ children }) => {
  return <ContentMainStyled>{children}</ContentMainStyled>;
};

const ContentMainStyled = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  max-width: 1360px;
`;

export default PageContainer;
