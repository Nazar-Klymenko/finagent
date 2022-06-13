import LoadingButton from "@mui/lab/LoadingButton";
import { LoadingButtonProps } from "@mui/lab/LoadingButton";
import {
  ButtonProps,
  CircularProgress,
  Button as MuiButton,
} from "@mui/material";

interface Props extends LoadingButtonProps {
  form?: string;
  children: string;
  onClick?: () => void;
}

const Button = ({ children, form, onClick, ...other }: Props): JSX.Element => {
  return (
    <LoadingButton
      {...other}
      variant="contained"
      type="submit"
      size="large"
      form={form}
      onClick={onClick}
      sx={{ my: "0.5rem" }}
      disableElevation
      loadingIndicator={<CircularProgress color="inherit" size={16} />}
    >
      {children}
    </LoadingButton>
  );
};

export default Button;
