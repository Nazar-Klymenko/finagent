import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { useTheme } from "@mui/material";
import { Container, LinearProgress, Skeleton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import useRouteLoader from "@hooks/useRouteLoader";

import { useAuth } from "@context/authContext";

import AuthButtons from "./AuthButtons";
import LanguageMenu from "./LanguageMenu";
import Links from "./Links";
import UserMenu from "./UserMenu";

const Navbar = (props: any): JSX.Element => {
  // const { loading } = useRouteLoader();
  let loading = false;
  const { currentUser } = useAuth(),
    { isLoggedIn, isSendingRequest } = currentUser;

  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <NavbarBg className="mui-fixed">
        <InnerNavbar>
          <Container maxWidth="lg">
            <ControlsWrap>
              <LanguageMenu />
              {isSendingRequest && (
                <Skeleton variant="rectangular" width={210}>
                  <UserMenu />
                </Skeleton>
              )}
              {!isSendingRequest &&
                (isLoggedIn ? <UserMenu /> : <AuthButtons />)}
            </ControlsWrap>
          </Container>
        </InnerNavbar>
      </NavbarBg>
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
const LogoWrap = styled("div")`
  flex: 1 3 auto;
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
