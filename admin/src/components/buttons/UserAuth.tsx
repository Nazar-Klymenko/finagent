import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";

const UserAuth: React.FC = () => {
  const { t } = useTranslation();
  return (
    <UserAuthStyled>
      <NavLink className="auth-btn login" to="/auth/login">
        {t("Navbar.logIn")}
      </NavLink>
      <NavLink className="auth-btn signup" to="/auth/signup">
        {t("Navbar.signUp")}
      </NavLink>
    </UserAuthStyled>
  );
};

const UserAuthStyled = styled.div`
  flex-wrap: nowrap;
  display: flex;
  .login {
    color: ${({ theme }) => theme.blue};
    background-color: white;
    border: 1px solid ${({ theme }) => theme.blue};
    text-decoration: none;

    @media screen and (max-width: ${({ theme }) => theme.widthTablet}) {
      display: flex;
      flex-direction: column;
    }
  }

  .signup {
    margin-left: 0.5rem;
    color: #ffffff;
    background-color: ${({ theme }) => theme.blue};
    border: 1px solid transparent;
    text-align: center;
    text-decoration: none;
    &:hover {
      box-shadow: 0 1px 2px 0 rgba(66, 133, 244, 0.3),
        0 1px 3px 1px rgba(66, 133, 244, 0.15);
      background-color: ${({ theme }) => theme.hoverBlue};
    }
  }

  .auth-btn {
    min-width: 4rem;
    border-radius: 5px;
    padding: 4px 14px;
    font-size: 0.9rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: 0.2s;
    white-space: nowrap;
    font-family: inherit;
    &:focus {
      box-shadow: 0 0 0 4px #cbd6ee;
    }
  }
`;
export default UserAuth;
