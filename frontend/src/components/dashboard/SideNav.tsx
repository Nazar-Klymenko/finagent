import React from "react";

import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";

import { Paper, Typography } from "@mui/material";
import { css, styled } from "@mui/material/styles";

const SideNav = (): JSX.Element => {
  const { t } = useTranslation();
  const { asPath } = useRouter();

  function CheckActiveLink(array: string[]) {
    return array.includes(asPath);
  }
  return (
    <Nav>
      {links.map((link, idx) => {
        return (
          <Link key={idx} href={link.href} passHref>
            <StyledLinkText
              as="a"
              variant="body1"
              isActive={CheckActiveLink(link.activePaths)}
            >
              {t(link.label)}
            </StyledLinkText>
          </Link>
        );
      })}
    </Nav>
  );
};

const links = [
  {
    href: "/dashboard/insurances",
    label: "Dashboard.SideMenu.insurances",
    activePaths: ["/dashboard/insurances"],
  },
  {
    href: "/dashboard/loans",
    label: "Dashboard.SideMenu.loans",
    activePaths: ["/dashboard/loans"],
  },
  {
    href: "/dashboard/history",
    label: "Dashboard.SideMenu.history",
    activePaths: ["/dashboard/history"],
  },
];

const StyledLinkText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive?: boolean }>`
  cursor: pointer;
  text-transform: capitalize;
  text-decoration: none;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  padding: 8px 20px;
  border-radius: 4px;
  transition: color 0.2s ease-in-out;

  &:visited {
    color: ${({ theme }) => theme.palette.common.black};
  }
  ${({ isActive, theme }) =>
    isActive &&
    css`
      color: ${theme.palette.primary.main} !important;
      background: ${theme.palette.secondary.main};
      &:visited {
        color: ${theme.palette.primary.main};
      }
    `};
`;

const Nav = styled(Paper)`
  padding: 8px;
  border-radius: 4px;
  list-style: none;
  display: flex;
  flex-direction: column;
  width: max-content;
  z-index: 15;
  height: max-content;

  min-width: 14rem;
`;

export default SideNav;

/* 

@media screen and (max-width: ${({ theme }) => theme.widthTablet}) {
    padding: 2px 8px 0px;
    position: sticky;
    top: 50px;
    left: 0;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-bottom: 0;
    border-radius: 0;
    border-bottom: 1px solid ${({ theme }) => theme.lightGray};
    box-shadow: none;
    width: auto;
    a {
      flex: 1;
      border-radius: 0;
      border-bottom: 2px solid transparent;
      font-size: 0.9rem;
      padding: 4px 16px 8px;
      margin-bottom: -1px;
      justify-content: center;
    }

    .link--selected {
      background: transparent;
      border-bottom: 2px solid ${({ theme }) => theme.blue} !important;
      box-shadow: none;
    }
  } */
