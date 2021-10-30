import React, { FC } from "react";
import Typography, { TypographyProps } from "@mui/material/Typography";

const Text: FC<TypographyProps> = ({ children, ...other }) => {
  return <Typography {...other}>{children}</Typography>;
};

export default Text;
