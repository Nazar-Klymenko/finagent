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
  justify-content: center;
  flex: 1;
`;
export default Form;
