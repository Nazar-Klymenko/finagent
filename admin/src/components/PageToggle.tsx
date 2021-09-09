import React from "react";
import styled from "styled-components/macro";

const PageToggle: React.FC = ({ children }) => {
  return <PageToggleStyled>{children}</PageToggleStyled>;
};

const PageToggleStyled = styled.div`
  padding: 8px 0px;
  a {
    text-decoration: none;
    padding: 0 0.5rem;
    font-size: 1.2rem;
    color: ${({ theme }) => theme.black};
    opacity: 0.6;
    &.selected {
      opacity: 1;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 2px;
        border-radius: 999px;
        background-color: ${({ theme }) => theme.blue};
        box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
        left: 0;
        bottom: 0;
      }
    }
  }
`;

export default PageToggle;
