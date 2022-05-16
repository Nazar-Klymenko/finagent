import React, { useState } from "react";

import { styled } from "@mui/material/styles";

export const QuestState = ({ data }) => {
  let show = false;
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  if (show) {
    return (
      <>
        <OpenBtn onClick={handleClick}>Q+</OpenBtn>
        {isOpen && (
          <Wrap>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </Wrap>
        )}
      </>
    );
  } else {
    return null;
  }
};

const OpenBtn = styled("div")`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bolder;
  height: 32px;
  width: 32px;
  background-color: ${({ theme }) => theme.palette.primary.main};
  position: fixed;
  bottom: 10px;
  left: 64px;
  border-radius: 999px;
  z-index: 99999999;
`;

const Wrap = styled("div")`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  position: fixed;
  background-color: white;
  max-height: 80vh;
  overflow-y: scroll;
  z-index: 9999;
  top: 64px;
  left: 32px;
`;
