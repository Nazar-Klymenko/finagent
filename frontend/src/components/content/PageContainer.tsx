import { FC } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

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
