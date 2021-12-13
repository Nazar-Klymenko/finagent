import React from "react";

import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";

const LogoWrap: React.FC = ({ children }) => {
  const history = useHistory();
  return (
    <LogoWrapStyled
      onClick={() => {
        history.push("/");
      }}
    >
      {children}
    </LogoWrapStyled>
  );
};

const LogoWrapStyled = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 0px;
  height: 42px;
  cursor: pointer;
  border-bottom: 1px solid ${({ theme }) => theme.gray};
  margin-bottom: 20px;
`;

export default LogoWrap;
