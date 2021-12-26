import React from "react";

import { styled } from "@mui/material/styles";

const FormError: React.FC = ({ children }) => {
  return <Error>{children}</Error>;
};

const Error = styled("div")`
  text-align: center;
  color: ${({ theme }) => theme.palette.error.main};
`;

export default FormError;
