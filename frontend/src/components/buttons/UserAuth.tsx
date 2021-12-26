import React from "react";

import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

interface Props {
  navOpen: boolean;
  setNavOpen: (arg0: boolean) => void;
}
const UserAuth: React.FC<Props> = ({ navOpen, setNavOpen }) => {
  const { t } = useTranslation();

  function handleClick() {
    setNavOpen(false);
  }

  return (
    <UserAuthStyled>
      <NavLink to="/auth/login/">
        <LogIn
          onClick={handleClick}
          color="primary"
          className="signup-button"
          form=""
          disableRipple
        >
          {t("Navbar.logIn")}
        </LogIn>
      </NavLink>

      <NavLink to="/auth/signup/">
        <SignUp
          onClick={handleClick}
          color="primary"
          className="signup-button"
          form=""
          disableRipple
        >
          {t("Navbar.signUp")}
        </SignUp>
      </NavLink>
    </UserAuthStyled>
  );
};

const UserAuthStyled = styled("div")`
  flex-wrap: nowrap;
  display: flex;
`;

const LogIn = styled(Button)`
  font-size: 14px;
  height: 2rem;
  margin-left: 0.5rem;
  color: ${({ theme }) => theme.palette.primary.main};
  background-color: white;
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  white-space: nowrap;
`;

const SignUp = styled(Button)`
  font-size: 14px;
  height: 2rem;
  margin-left: 0.5rem;
  color: #ffffff;
  background-color: ${({ theme }) => theme.palette.primary.main};
  white-space: nowrap;
`;

export default UserAuth;
