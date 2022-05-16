import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { useTheme } from "@mui/material";
import { Container, Skeleton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useAuth } from "@context/authContext";

import Links from "./Links";

const Sidebar = (props: any): JSX.Element => {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <NavbarBg className="mui-fixed">
        <InnerNavbar>
          <LogoWrap>
            <Link href={"/applications"} passHref>
              <Logo>
                <Image src="/logo-pale.svg" height="44" width="90" alt="" />
              </Logo>
            </Link>
          </LogoWrap>
          <Links />
        </InnerNavbar>
      </NavbarBg>
    </>
  );
};

const NavbarBg = styled("div")`
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.palette.grey[900]};
  ${({ theme }) => theme.mixins.toolbar}
  z-index:${({ theme }) => theme.zIndex.appBar + 1};
  width: 220px;
`;
const InnerNavbar = styled("div")`
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: column;
  padding: 1rem;
`;
const LogoWrap = styled("div")`
  flex: 1;
  justify-content: flex-start;
  width: 100%;
`;
const Logo = styled("a")`
  height: 100%;
  display: flex;
  align-items: center;
`;

export { Sidebar };
