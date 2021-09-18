import React, { FC } from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";

import { UserAuth } from "@components/buttons";
import { useTranslation } from "react-i18next";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "@redux/auth/actions";

import ExitToAppIcon from "@material-ui/icons/ExitToApp";

interface Props {
  navOpen: boolean;
  setNavOpen: (arg0: boolean) => void;
}

const AuthLinks: FC<Props> = ({ navOpen, setNavOpen }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logout());
  };

  const isLoggedIn = useSelector((state: any) => state.user.isLoggedIn);

  return (
    <AuthLinksWrap>
      {isLoggedIn ? (
        <SignOutLink
          to=""
          onClick={() => {
            setNavOpen(false);
            logOut();
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

const AuthLinksWrap = styled.div`
  display: flex;
  flex-direction: row;
  background: white;
  padding: 12px 1rem;

  @media screen and (max-width: ${({ theme }) => theme.widthPhone}) {
    padding: 12px 0;
  }
`;
