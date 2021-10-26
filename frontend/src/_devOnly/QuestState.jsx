import React, { useState } from "react";
import styled from "styled-components";

export const QuestState = ({ data }) => {
  let show = true;
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  if (process.env.NODE_ENV === "development" && show) {
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

const OpenBtn = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bolder;
  height: 32px;
  width: 32px;
  background-color: ${({ theme }) => theme.blue};
  position: fixed;
  bottom: 10px;
  left: 64px;
  border-radius: 999px;
`;

const Wrap = styled.div`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.gray};
  position: fixed;
  background-color: white;
  max-height: 80vh;
  overflow-y: scroll;
  z-index: 9999;
  top: 64px;
  left: 32px;
`;
