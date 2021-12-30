import { styled } from "@material-ui/core/styles";
import react from "React";

const FacebookButton = (): JSX.Element => {
  return <FacebookButtonStyled></FacebookButtonStyled>;
};

const FacebookButtonStyled = styled("button")`
  cursor: pointer;
  height: 48px;
  background: ${({ theme }) => theme.buttons.facebook};
  color: white;
  border-radius: 3px;
  border: none;
  margin: 0.5rem 0;
  font-size: 1rem;
  &:hover {
    opacity: 0.8;
  }
`;
