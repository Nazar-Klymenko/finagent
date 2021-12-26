import { styled } from "@mui/material/styles";

export const ChangingPage = styled("div")`
  max-width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  h3 {
    padding-bottom: 0.5rem;
  }
`;

export const StatusError = styled("div")`
  margin-top: 1rem;
  text-align: center;
  color: ${({ theme }) => theme.red};
`;

export const ButtonPosition = styled("div")`
  display: flex;
  justify-content: flex-end;
`;
