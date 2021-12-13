import React from "react";

import { FormProvider } from "react-hook-form";
import styled from "styled-components/macro";

interface Props {
  id: string;
  onSubmit?: any;
  methods: any;
}
const Form: React.FC<Props> = ({ id, children, methods, ...props }) => {
  return (
    <FormProvider {...methods}>
      <FormStyled id={id} className="super-form" noValidate {...props}>
        {children}
      </FormStyled>
    </FormProvider>
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
