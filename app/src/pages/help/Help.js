import React from "react";
import styled from "styled-components/macro";
import useTitle from "@hooks/useTitle";
import Question from "./question/Question";

const Help = () => {
  useTitle("Help | FinAgent");

  return (
    <HelpStyled>
      <HelpPage>
        <HelpTitle>
          <h2>Frequently asked questions</h2>
        </HelpTitle>
        <Question
          header="Can I already start using FinAgent ?"
          content="Yes, please do. We are now in early access meaning the solution is
          fully operational but has still some rough edges that need polishing.
          We are particularly eager of user feedback to improve the features,
          the design and iron out any bugs that may have survived our internal
          testing."
        />
        <Question
          header="Can I use any device ?"
          content="Yes, please do. We are now in early access meaning the solution is
          fully operational but has still some rough edges that need polishing.
          We are particularly eager of user feedback to improve the features,
          the design and iron out any bugs that may have survived our internal
          testing."
        />
        <Question
          header="Is FinAgent free ?"
          content="Yes, please do. We are now in early access meaning the solution is
          fully operational but has still some rough edges that need polishing.
          We are particularly eager of user feedback to improve the features,
          the design and iron out any bugs that may have survived our internal
          testing."
        />
        <Question
          header="Is my data secure ?"
          content="Yes, please do. We are now in early access meaning the solution is
          fully operational but has still some rough edges that need polishing.
          We are particularly eager of user feedback to improve the features,
          the design and iron out any bugs that may have survived our internal
          testing."
        />
        <Question
          header="Is my data confidential ?"
          content="Yes, please do. We are now in early access meaning the solution is
          fully operational but has still some rough edges that need polishing.
          We are particularly eager of user feedback to improve the features,
          the design and iron out any bugs that may have survived our internal
          testing."
        />
      </HelpPage>
    </HelpStyled>
  );
};

export default Help;

const HelpStyled = styled.div`
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 1.5rem 4rem 70px;
  margin: 1.5rem auto;
  background-color: #ffffff;
  box-shadow: 0px 6px 30px 2px rgba(0, 0, 0, 0.1);
  border-radius: 14px;
  @media all and (max-width: ${({ theme }) => theme.widthPhone}) {
    min-height: 100vh;
    margin: unset;
    padding: 1.5rem 1rem 70px;
  }
  @media all and (max-width: ${({ theme }) => theme.widthDesktop}) {
    width: 80%;
  }
`;
const HelpPage = styled.div`
  width: 100%;
`;
const HelpTitle = styled.div`
  text-align: center;
  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 1rem 0;
  }
`;
