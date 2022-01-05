import React, { FC } from "react";

import { ButtonProps } from "@material-ui/core/Button";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

interface Props extends ButtonProps {
  text: string;
  color: "primary" | "secondary";
  form?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
  large?: boolean;
}

const MuiButton: FC<Props> = ({
  text,
  color,
  form,
  isLoading,
  isDisabled,
  onClick,
  ...other
}) => {
  return (
    <Button
      variant="contained"
      size="large"
      color={color}
      form={form}
      type="submit"
      onClick={onClick}
      disabled={isDisabled || isLoading}
      startIcon={isLoading && <CircularProgress color="primary" size={16} />}
      {...other}
    >
      {text}
    </Button>
  );
};

export default MuiButton;