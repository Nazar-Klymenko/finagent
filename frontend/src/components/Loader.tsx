import React from "react";

import { styled } from "@mui/material/styles";

const Loader: React.FC = () => {
  return (
    <LoaderStyled>
      <div className="loader"></div>
    </LoaderStyled>
  );
};

const LoaderStyled = styled("div")`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  min-width: 100%;
  height: 100%;
  min-height: 100vh;
  max-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 49;

  .loader {
    border: 8px solid ${({ theme }) => theme.palette.secondary.main};
    border-radius: 50%;
    border-top: 8px solid ${({ theme }) => theme.palette.primary.main};
    height: 4rem;
    width: 4rem;
    animation: spin 2s linear infinite;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
