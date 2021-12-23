import React from "react";

import { useTranslation } from "react-i18next";
import styled from "styled-components/macro";

import useTitle from "@hooks/useTitle";

import { ContentWrap } from "@components/content";
import { Header } from "@components/typography";

import { Accordion } from "./Accordion";

const Help = () => {
  useTitle("Help | FinAgent");
  const { t } = useTranslation();

  return (
    <ContentWrap xs direction="column">
      <Header bottomGutter>{t("Help.title")}</Header>
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
        <Accordion header="Example question">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ipsum
          voluptate repudiandae tempora vel debitis facere omnis ratione quam.
          Voluptatum explicabo temporibus ipsam deleniti qui eaque quas pariatur
          aspernatur! Autem! Sed hic saepe quidem. Amet eos voluptas error
          quidem tempore sint nam, esse consequuntur quam numquam? Aliquam
          accusamus autem animi fuga delectus. Dolores aperiam repellat sed
          animi aspernatur ipsum dignissimos?
        </Accordion>
        <Accordion header="Example question">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ipsum
          voluptate repudiandae tempora vel debitis facere omnis ratione quam.
          Voluptatum explicabo temporibus ipsam deleniti qui eaque quas pariatur
          aspernatur! Autem! Sed hic saepe quidem. Amet eos voluptas error
          quidem tempore sint nam, esse consequuntur quam numquam? Aliquam
          accusamus autem animi fuga delectus. Dolores aperiam repellat sed
          animi aspernatur ipsum dignissimos?
        </Accordion>
        <Accordion header="Example question">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ipsum
          voluptate repudiandae tempora vel debitis facere omnis ratione quam.
          aspernatur! Autem! Sed hic saepe quidem. Amet eos voluptas error
          quidem tempore sint nam, esse consequuntur quam numquam? Aliquam
          accusamus autem animi fuga delectus. Dolores aperiam repellat sed
          animi aspernatur ipsum dignissimos?
        </Accordion>
        <Accordion header="Example question">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ipsum
          voluptate repudiandae tempora vel debitis facere omnis ratione quam.
          Voluptatum explicabo temporibus ipsam deleniti qui eaque quas pariatur
          aspernatur! Autem! Sed hic saepe quidem. Amet eos voluptas error
          quidem tempore sint nam, esse consequuntur quam numquam? Aliquam
          accusamus autem animi fuga delectus. Dolores aperiam repellat sed
          animi aspernatur ipsum dignissimos?
        </Accordion>
        <Accordion header="Example question">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta ipsum
          voluptate repudiandae tempora vel debitis facere omnis ratione quam.
          Voluptatum explicabo temporibus ipsam deleniti qui eaque quas pariatur
          aspernatur! Autem! Sed hic saepe quidem. Amet eos voluptas error
          quidem tempore sint nam, esse consequuntur quam numquam? Aliquam
          accusamus autem animi fuga delectus. Dolores aperiam repellat sed
          animi aspernatur ipsum dignissimos?
        </Accordion>
        <Accordion header="Example question">
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
  max-width: 680px;
`;
