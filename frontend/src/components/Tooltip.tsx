import react from "react";

import { Tooltip as MuiTooltip } from "@mui/material";
import { styled } from "@mui/material/styles";

interface Props {
  children: React.ReactElement;
  title: string;
}

const Tooltip = ({ children, title }: Props): JSX.Element => {
  return <TooltipStyled title={title}>{children}</TooltipStyled>;
};

export { Tooltip };

const TooltipStyled = styled(MuiTooltip)``;
