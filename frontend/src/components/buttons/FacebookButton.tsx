import { styled } from "@mui/material/styles";
import { Button as MuiButton, ButtonProps } from "@mui/material";
import react from "React";

interface Props extends ButtonProps {
  onClick?: () => void;
  children: string;
}

const FacebookButton = ({
  onClick,
  children,
  ...other
}: Props): JSX.Element => {
  return (
    <MuiButton
      variant="contained"
      onClick={onClick}
      type="submit"
      size="large"
      form=""
      color="primary"
      style={{ backgroundColor: "#3B5998", margin: "0.5rem" }}
      {...other}
    >
      {children}
    </MuiButton>
  );
};

export default FacebookButton;
