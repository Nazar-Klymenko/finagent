import React from "react";
import styled from "styled-components/macro";

interface Props {
  isDirty: boolean;
}
type Styled = {
  isDirty: boolean;
};
const Section: React.FC<Props> = ({ children, isDirty }) => {
  return <SectionStyled isDirty={isDirty}>{children}</SectionStyled>;
};

const SectionStyled = styled.div<Styled>`
  position: relative;
  &::before {
    content: "";
    position: absolute;
    left: -1rem;
    bottom: 0;
    width: 3px;
    height: calc(100% - 2rem);
    background: ${({ theme }) => theme.blue};
    border-radius: 999px;
    opacity: ${({ isDirty }) => (isDirty ? 1 : 0)};
  }
`;

export default Section;
