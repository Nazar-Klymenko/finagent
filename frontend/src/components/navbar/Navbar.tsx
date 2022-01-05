import React, { useState } from "react";

import { Container, LinearProgress, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import Link from "next/link";

import useRouteLoader from "@hooks/useRouteLoader";

import { useAuth } from "@context/authContext";
import UserMenu from "./UserMenu";

const Navbar = (): JSX.Element => {
  const { loading } = useRouteLoader();
  const { currentUser } = useAuth();
  const { isLoggedIn } = currentUser;

  return (
    <>
      <NavbarBg>
        <Container maxWidth="lg">
          <InnerNavbar>
            <Link href={"/home"} passHref>
              <Logo>
                <Image src="/logo.svg" height="44" width="90" alt="" />
              </Logo>
            </Link>

            <LinksContainer>
              <Link href={"/home"} passHref>
                <StyledLinkText as="a" variant="body1">
                  Home
                </StyledLinkText>
              </Link>
              <Link href={"/test-form"} passHref>
                <StyledLinkText as="a" variant="body1">
                  Form
                </StyledLinkText>
              </Link>
            </LinksContainer>
            <UserMenu />
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

const LinksContainer = styled("div")`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledLinkText = styled(Typography)`
  color: ${({ theme }) => theme.palette.text.primary};
  text-decoration: none;
  padding: 8px;
  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
`;

const LoaderWrap = styled("div")`
  height: 4px;
`;

export default Navbar;
