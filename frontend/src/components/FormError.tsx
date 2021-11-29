import React from "react";

import styled from "styled-components/macro";

const FormError: React.FC = ({ children }) => {
  return <Error>{children}</Error>;
};

const Error = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.red};
`;

export default FormError;
