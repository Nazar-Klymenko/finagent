import { ButtonProps, Button as MuiButton } from "@mui/material";

interface Props extends ButtonProps {
  form?: string;
  children: string;
  onClick?: () => void;
}

const Button = ({ children, form, onClick, ...other }: Props): JSX.Element => {
  return (
    <MuiButton
      variant="contained"
      type="submit"
      size="large"
      form={form}
      onClick={onClick}
      {...other}
      sx={{ my: "0.5rem" }}
      disableElevation
    >
      {children}
    </MuiButton>
  );
};

export default Button;
