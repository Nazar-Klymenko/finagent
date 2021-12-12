import React from "react";

import styled from "styled-components/macro";

interface Props {
  id: string;
  onSubmit?: any;
}
const Form: React.FC<Props> = ({ id, children, ...props }) => {
  return (
    <FormStyled id={id} className="super-form" noValidate {...props}>
      {children}
    </FormStyled>
  );
};

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 100%;
  width: 540px;
  max-width: 100%;
  @media screen and (max-width: ${({ theme }) => theme.widthTablet}) {
    min-width: 540px;
  }
  @media screen and (max-width: ${({ theme }) => theme.widthPhone}) {
    min-width: 280px;
  }
`;
export default Form;
