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
  padding: 3px 0px;
  height: 100%;
  max-height: 60px;
  cursor: pointer;
`;

export default LogoWrap;
