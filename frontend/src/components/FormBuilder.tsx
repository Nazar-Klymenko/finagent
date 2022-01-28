import { Avatar } from "@mui/material";
import { styled } from "@mui/material/styles";

const ButtonsWrap = styled("div")<{ multiple?: boolean }>`
  padding: 16px 0px;
  display: flex;
  justify-content: ${({ multiple }) =>
    multiple ? "space-between" : "flex-end"};
`;

const ApplicantBox = styled("div")`
  min-height: 32px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  border-radius: 5px;
`;
const ApplicantAdd = styled("span")`
  cursor: pointer;
  color: ${({ theme }) => theme.palette.primary.main};
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    padding-left: 8px;
  }
`;

const AvatarStyled = styled(Avatar)`
  height: 2.5rem;
  width: 2.5rem;
  background-color: ${({ theme }) => theme.palette.primary.main};
`;

const Applicant = styled("div")<{ error: boolean }>`
  display: flex;
  border: 1px solid
    ${({ theme, error }) =>
      error ? theme.palette.error.main : theme.palette.divider};
  padding: 8px 14px;
  border-radius: 4px;
  margin: 6px 0px;
  align-items: center;
`;

const ApplicantName = styled("span")`
  flex: 1;
  margin-left: 8px;
`;

const InputsWrap = styled("div")`
  display: flex;
  gap: 12px;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    flex-direction: column;
  }
`;

const FormBuilder = {
  ButtonsWrap,
  ApplicantBox,
  ApplicantAdd,
  AvatarStyled,
  Applicant,
  ApplicantName,
  InputsWrap,
};
export default FormBuilder;
