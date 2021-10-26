import React from "react";
import styled from "@emotion/styled";

import { useBackdrop } from "@context/backdropContext";

const Backdrop: React.FC = () => {
  const { isBackdropOpen, setBackdropOpen } = useBackdrop();

  return isBackdropOpen ? (
    <BackdropStyled
      onClick={() => {
        setBackdropOpen(false);
      }}
    />
  ) : null;
};

const BackdropStyled = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

export default Backdrop;
