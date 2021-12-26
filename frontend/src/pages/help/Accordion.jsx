import { useState } from "react";

import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const Accordion = ({ header, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <AccordionStyled
      onClick={() => {
        setIsOpen(!isOpen);
      }}
    >
      <AccordionInner>
        <Typography variant="h6">{header}</Typography>
        <Plus>{isOpen ? "-" : "+"}</Plus>
      </AccordionInner>
      <Desc isOpen={isOpen}>
        <Typography variant="body1"> {children}</Typography>
      </Desc>
    </AccordionStyled>
  );
};

export { Accordion };

const AccordionStyled = styled("div")`
  min-height: 6rem;
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[400]};
  overflow: hidden;
  cursor: pointer;
  line-height: 130%;
`;

const AccordionInner = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Desc = styled("span")`
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  cursor: text;
`;

const Plus = styled("span")`
  padding: 1rem;
  font-size: 1.5rem;
  &::selection {
    background: none;
  }
`;
