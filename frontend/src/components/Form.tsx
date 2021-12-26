import React from "react";

import { styled } from "@mui/material/styles";
import { FormProvider } from "react-hook-form";

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

const FormStyled = styled("form")`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 300px;
  max-width: 100%;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.values.md}) {
    min-width: unset;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.values.sm}) {
    min-width: unset;
  }
`;
export default Form;
