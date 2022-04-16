import { styled } from "@mui/material/styles";

export const InputContainer = styled("div")<{ width?: "s" | "m" | "l" }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 2px 0 0.5rem;
`;

export const Label = styled("label")`
  max-width: 680px;
  display: flex;
  width: 100%;
`;

export const InputErrorMessage = styled("div")`
  color: ${({ theme }) => theme.palette.error.main};
  /* margin: 6px 0px 0px; */
  min-height: 1.5rem;
`;

export const Optional = styled("div")`
  font-size: 0.9rem;
  display: flex;
  flex: 1;
  color: ${({ theme }) => theme.palette.text.secondary};
  justify-content: flex-end;
`;
