import { styled } from "@mui/material/styles";

const DirtySection = ({}): JSX.Element => {
  return <VLine />;
};
export { DirtySection };

const VLine = styled("div")`
  background: ${({ theme }) => theme.palette.primary.main};
  width: 3px;
  border-radius: 5px;
  position: absolute;
  left: -8px;
  bottom: 0;
  top: 0;
`;
