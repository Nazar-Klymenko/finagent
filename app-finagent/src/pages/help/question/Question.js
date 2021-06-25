import React, { useState } from "react";
import styled from "styled-components/macro";

import { ArrowDown } from "@components/svgs";

const Question = ({ header, content }) => {
  const [openQuestion, setOpenQuestion] = useState(false);

  const handleOpenQuestion = () => {
    setOpenQuestion(!openQuestion);
  };
  return (
    <QuestionStyled onClick={handleOpenQuestion}>
      <QuestionHeader>
        <h3>{header}</h3>
        <ArrowDown rotation={openQuestion ? 180 : 0} fill="#1672EC" />
      </QuestionHeader>
      <QuestionContent openQuestion={openQuestion}>{content}</QuestionContent>
      <Stroke />
    </QuestionStyled>
  );
};

export default Question;

const QuestionStyled = styled.div`
  overflow: hidden;
  margin-bottom: 2rem;
`;
const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  h3 {
    font-size: 1.2rem;
    font-weight: 500;
    @media all and (max-width: ${({ theme }) => theme.widthPhone}) {
      font-size: 1rem;
    }
  }
`;
const QuestionContent = styled.div`
  height: ${({ openQuestion }) => (openQuestion ? "auto" : "0px")};
  color: ${({ theme }) => theme.gray};
  padding-bottom: 0.2rem;
`;
const Stroke = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.lightGray};
`;
