import React from "react";

import { styled } from "@mui/material/styles";
import { FormProvider } from "react-hook-form";

interface Props {
  id: string;
  onSubmit?: any;
  methods: any;
  children: any;
}
const Form = ({ id, children, methods, ...props }: Props): JSX.Element => {
  return (
    <FormProvider {...methods}>
      <FormStyled id={id} className="super-form" noValidate {...props}>
        {children}
      </FormStyled>
    </FormProvider>
  );
};
export { Form };

const FormStyled = styled("form")`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  min-width: 300px;
  max-width: 100%;
  ${({ theme }) => theme.breakpoints.down("md")} {
    min-width: unset;
  }
`;
