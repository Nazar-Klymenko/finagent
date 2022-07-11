import React from "react";

import { useRouter } from "next/router";

import { getAllLanguageSlugs, getLanguage } from "@lib/i18n";
import { Paper, Typography } from "@mui/material";
import { css, styled } from "@mui/material/styles";
import i18next from "i18next";

import Link from "@components/LinkComponent";

const SideNav = ({ links }: any): JSX.Element => {
  const { t } = i18next;
  const { asPath } = useRouter();

  function CheckActiveLink(array: string[]) {
    return array.includes(asPath);
  }
  return (
    <Nav>
      {links.map((link: any, idx: number) => {
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
export { SideNav };

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
      background: ${theme.palette.secondary.light};
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
