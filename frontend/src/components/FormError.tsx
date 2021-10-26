import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const FormError: React.FC = ({ children }) => {
  return <Error>{children}</Error>;
};

const Error = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.red};
`;

export default FormError;
