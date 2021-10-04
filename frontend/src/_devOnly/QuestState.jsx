import React from "react";
import styled from "styled-components";

export const QuestState = ({ data }) => {
  let show = false;
  if (process.env.NODE_ENV === "development" && show) {
    return (
      <Wrap>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Wrap>
    );
  } else {
    return null;
  }
};

const Wrap = styled.div`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.gray};
  position: sticky;
  top: 32px;
  left: 32px;
`;
