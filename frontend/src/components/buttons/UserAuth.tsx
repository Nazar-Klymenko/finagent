import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { MainButton } from "./ButtonBase";

interface Props {
  navOpen: boolean;
  setNavOpen: (arg0: boolean) => void;
}
const UserAuth: React.FC<Props> = ({ navOpen, setNavOpen }) => {
  const { t } = useTranslation();

  function LogInAction() {
    setNavOpen(false);
  }
  function SignUpAction() {
    setNavOpen(false);
  }

  return (
    <UserAuthStyled>
      <NavLink to="/auth/login/">
        <LogIn
          onClick={LogInAction}
          text={t("Navbar.logIn")}
          color="primary"
          className="signup-button"
          form=""
          noRipple
        />
      </NavLink>

      <NavLink to="/auth/signup/">
        <SignUp
          onClick={SignUpAction}
          text={t("Navbar.signUp")}
          color="primary"
          className="signup-button"
          form=""
          noRipple
        />
      </NavLink>
    </UserAuthStyled>
  );
};

const UserAuthStyled = styled.div`
  flex-wrap: nowrap;
  display: flex;
`;

const LogIn = styled(MainButton)`
  font-size: 14px;
  height: 2rem;
  margin-left: 0.5rem;
  color: ${({ theme }) => theme.blue};
  background-color: white;
  border: 1px solid ${({ theme }) => theme.blue};
  white-space: nowrap;
`;

const SignUp = styled(MainButton)`
  font-size: 14px;
  height: 2rem;
  margin-left: 0.5rem;
  color: #ffffff;
  background-color: ${({ theme }) => theme.buttons.primaryBg};
  white-space: nowrap;
`;

// const UserAuthStyled = styled.div
//   flex-wrap: nowrap;
//   display: flex;
//   .login {
//     color: ${({ theme }) => theme.blue};
//     background-color: white;
//     border: 1px solid ${({ theme }) => theme.blue};
//     text-decoration: none;

//     @media screen and (max-width: ${({ theme }) => theme.widthTablet}) {
//       display: flex;
//       flex-direction: column;
//     }
//   }

//   .signup {
//     margin-left: 0.5rem;
//     color: #ffffff;
//     background-color: ${({ theme }) => theme.blue};
//     border: 1px solid transparent;
//     text-align: center;
//     text-decoration: none;
//     &:hover {
//       box-shadow: 0 1px 2px 0 rgba(66, 133, 244, 0.3),
//         0 1px 3px 1px rgba(66, 133, 244, 0.15);
//       background-color: ${({ theme }) => theme.hoverBlue};
//     }
//   }

//   .auth-btn {
//     min-width: 4rem;
//     /* border: none; */
//     border-radius: 3px;
//     height: 24px;
//     padding: 4px 14px;
//     font-size: 0.9rem;
//     display: inline-flex;
//     align-items: center;
//     justify-content: center;
//     transition: 0.2s;
//     white-space: nowrap;
//     font-family: inherit;
//     &:focus {
//       box-shadow: 0 0 0 4px #cbd6ee;
//     }
//   }

//   @media screen and (max-width: ${({ theme }) => theme.widthTablet}) {
//     display: flex;
//     justify-content: space-evenly;
//     flex-direction: column;
//     margin: 0 auto;
//     .auth-btn {
//       width: 7rem;
//       height: 3rem;
//       margin-bottom: 12px;
//       margin-left: 0;
//       font-size: 1rem;
//     }
//   }
// `;
export default UserAuth;
