import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const FileBox = (): JSX.Element => {
  return <FileBoxContainer>h111</FileBoxContainer>;
};

export { FileBox };

const FileBoxContainer = styled("section")`
  border: 1px solid ${({ theme }) => theme.palette.divider};
`;
