import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { Container, LinearProgress, Skeleton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import useRouteLoader from "@hooks/useRouteLoader";

import { useAuth } from "@context/authContext";

import AuthButtons from "./AuthButtons";
import LanguageMenu from "./LanguageMenu";
import Links from "./Links";
import Notifications from "./Notifications";
import UserMenu from "./UserMenu";

const Navbar = (props: any): JSX.Element => {
  // const { loading } = useRouteLoader();
  let loading = false;
  const { currentUser } = useAuth(),
    { isLoggedIn, isSendingRequest } = currentUser;

  // const { isLoggedIn, isSendingRequest } = currentUser;

  return (
    <>
      <NavbarBg>
        <Container maxWidth="lg">
          <InnerNavbar>
            <LogoWrap>
              <Link href={"/home"} passHref>
                <Logo>
                  <Image src="/logo.svg" height="44" width="90" alt="" />
                </Logo>
              </Link>
            </LogoWrap>

            <LinksContainer>
              <Links />
            </LinksContainer>

            <ControlsWrap>
              {isLoggedIn && <Notifications />}
              <LanguageMenu />
              {isSendingRequest && (
                <Skeleton variant="rectangular" width={210}>
                  <UserMenu />
                </Skeleton>
              )}
              {!isSendingRequest &&
                (isLoggedIn ? <UserMenu /> : <AuthButtons />)}
            </ControlsWrap>
          </InnerNavbar>
        </Container>
      </NavbarBg>
      <LoaderWrap>
        {loading && <LinearProgress variant="indeterminate" />}
      </LoaderWrap>
    </>
  );
};

const NavbarBg = styled("div")`
  max-height: 64px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
  background-color: ${({ theme }) => theme.palette.background.default};
  ${({ theme }) => theme.mixins.toolbar}
  z-index:${({ theme }) => theme.zIndex.appBar}
`;
const InnerNavbar = styled("div")`
  display: flex;
  align-items: center;
  width: 100%;
  ${({ theme }) => theme.mixins.toolbar}
`;

const Logo = styled("a")`
  height: 100%;
  display: flex;
  align-items: center;
`;

const ControlsWrap = styled("div")`
  display: flex;
  flex: 0 3 auto;
  justify-content: flex-end;
`;

const LogoWrap = styled("div")`
  flex: 1 3 auto;
`;
const LinksContainer = styled("div")`
  flex: 2 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.breakpoints.down("md")} {
    display: none;
  }
`;

const LoaderWrap = styled("div")`
  height: 4px;
`;

export default Navbar;
