import { useState } from "react";
import styled from "styled-components/macro";
import { Text, Header } from "@components/typography";

const Accordion = ({ header, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <AccordionStyled
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      <AccordionInner>
        <Header variant="h3">{header}</Header>
        <Plus>{isOpen ? "-" : "+"}</Plus>
      </AccordionInner>
      <Desc isOpen={isOpen}>
        <Text> {children}</Text>
      </Desc>
    </AccordionStyled>
  );
};

export { Accordion };

const AccordionStyled = styled.div`
  min-height: 6rem;
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.lightGray};
  overflow: hidden;
  cursor: pointer;
  line-height: 130%;
`;

const AccordionInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Desc = styled.span`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  cursor: text;
`;

const Plus = styled.span`
  padding: 1rem;
  font-size: 1.5rem;
  &::selection {
    background: none;
  }
`;
