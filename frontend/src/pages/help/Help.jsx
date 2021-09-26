import React from "react";
import styled from "styled-components/macro";
import useTitle from "@hooks/useTitle";
import { ContentWrap } from "@components/content";
import { Header } from "@components/typography";
import { Accordion } from "./Accordion";
const Help = () => {
  useTitle("Help | FinAgent");

  return (
    <ContentWrap blank fullWidth fullHeight direction="column">
      <Header bottomGutter>Frequently asked questions</Header>
      <AccordionContainer>
        <Accordion header="Example question">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ipsum
          voluptate repudiandae tempora vel debitis facere omnis ratione quam.
          Voluptatum explicabo temporibus ipsam deleniti qui eaque quas pariatur
          aspernatur! Autem! Sed hic saepe quidem. Amet eos voluptas error
          quidem tempore sint nam, esse consequuntur quam numquam? Aliquam
          accusamus autem animi fuga delectus. Dolores aperiam repellat sed
          animi aspernatur ipsum dignissimos?
        </Accordion>
        <Accordion header="asdbebeasdaksjdkajdskajsd">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ipsum
          voluptate repudiandae tempora vel debitis facere omnis ratione quam.
          Voluptatum explicabo temporibus ipsam deleniti qui eaque quas pariatur
          aspernatur! Autem! Sed hic saepe quidem. Amet eos voluptas error
          quidem tempore sint nam, esse consequuntur quam numquam? Aliquam
          accusamus autem animi fuga delectus. Dolores aperiam repellat sed
          animi aspernatur ipsum dignissimos?
        </Accordion>
        <Accordion header="asdbebeasdaksjdkajdskajsd">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ipsum
          voluptate repudiandae tempora vel debitis facere omnis ratione quam.
          Voluptatum explicabo temporibus ipsam deleniti qui eaque quas pariatur
          aspernatur! Autem! Sed hic saepe quidem. Amet eos voluptas error
          quidem tempore sint nam, esse consequuntur quam numquam? Aliquam
          accusamus autem animi fuga delectus. Dolores aperiam repellat sed
          animi aspernatur ipsum dignissimos?
        </Accordion>
        <Accordion header="asdbebeasdaksjdkajdskajsd">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ipsum
          voluptate repudiandae tempora vel debitis facere omnis ratione quam.
          aspernatur! Autem! Sed hic saepe quidem. Amet eos voluptas error
          quidem tempore sint nam, esse consequuntur quam numquam? Aliquam
          accusamus autem animi fuga delectus. Dolores aperiam repellat sed
          animi aspernatur ipsum dignissimos?
        </Accordion>
        <Accordion header="asdbebeasdaksjdkajdskajsd">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ipsum
          voluptate repudiandae tempora vel debitis facere omnis ratione quam.
          Voluptatum explicabo temporibus ipsam deleniti qui eaque quas pariatur
          aspernatur! Autem! Sed hic saepe quidem. Amet eos voluptas error
          quidem tempore sint nam, esse consequuntur quam numquam? Aliquam
          accusamus autem animi fuga delectus. Dolores aperiam repellat sed
          animi aspernatur ipsum dignissimos?
        </Accordion>
        <Accordion header="asdbebeasdaksjdkajdskajsd">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ipsum
          voluptate repudiandae tempora vel debitis facere omnis ratione quam.
          Voluptatum explicabo temporibus ipsam deleniti qui eaque quas pariatur
          aspernatur! Autem! Sed hic saepe quidem. Amet eos voluptas error
          quidem tempore sint nam, esse consequuntur quam numquam? Aliquam
          accusamus autem animi fuga delectus. Dolores aperiam repellat sed
          animi aspernatur ipsum dignissimos?
        </Accordion>
        <Accordion header="asdbebeasdaksjdkajdskajsd">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ipsum
          voluptate repudiandae tempora vel debitis facere omnis ratione quam.
          Voluptatum explicabo temporibus ipsam deleniti qui eaque quas pariatur
          aspernatur! Autem! Sed hic saepe quidem. Amet eos voluptas error
          quidem tempore sint nam, esse consequuntur quam numquam? Aliquam
          accusamus autem animi fuga delectus. Dolores aperiam repellat sed
          animi aspernatur ipsum dignissimos?
        </Accordion>
      </AccordionContainer>
    </ContentWrap>
  );
};

export default Help;

const AccordionContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.lightGray};
  border-radius: 4px;
  height: auto;
  width: 100%;
`;
