import React, { FC } from "react";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { useAuth } from "@context/authContext";

import { UserAuth } from "@components/buttons";

interface Props {
  navOpen: boolean;
  setNavOpen: (arg0: boolean) => void;
}

const AuthLinks: FC<Props> = ({ navOpen, setNavOpen }) => {
  const { t } = useTranslation();
  const history = useHistory();

  const { currentUser, logout } = useAuth();
  const { isLoggedIn } = currentUser;

  const logOutButton = () => {
    logout(() => history.push("/"));
  };
  return (
    <AuthLinksWrap>
      {isLoggedIn ? (
        <SignOutLink
          to=""
          onClick={() => {
            setNavOpen(false);
            logOutButton();
          }}
        >
          <span>{t("UserDropdown.signOut")}</span>
          <ExitToAppIcon />
        </SignOutLink>
      ) : (
        <UserAuth navOpen={navOpen} setNavOpen={setNavOpen} />
      )}
    </AuthLinksWrap>
  );
};

export default AuthLinks;

const SignOutLink = styled(NavLink)`
  display: flex;
  flex-direction: row;
  align-items: center;
  span {
    padding-right: 0.5rem;
  }
`;

const AuthLinksWrap = styled("div")`
  display: flex;
  flex-direction: row;
  background: white;
  padding: 12px 1rem;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.values.sm}) {
    padding: 12px 0;
  }
`;
