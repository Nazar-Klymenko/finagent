import Link from "next/link";
import { useRouter } from "next/router";

import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import useLayoutTranslation from "@hooks/useLayoutTranslation";

import { links } from "./config";

const Links = (): JSX.Element => {
  const { locale, asPath } = useRouter();
  //@ts-ignore
  const { _t } = useLayoutTranslation(locale);

  function CheckActiveLink(array: string[]) {
    return array.includes(asPath);
  }

  return (
    <LinksContainer>
      {links.map((link: any, idx) => {
        return (
          <LinkWrap key={idx}>
            <Link href={link.href} passHref>
              <StyledLinkText
                as="a"
                variant="body1"
                isActive={CheckActiveLink(link.activePaths)}
              >
                <Box sx={{ pr: "0.5rem" }}>{link.icon}</Box>
                {_t(link.label)}
              </StyledLinkText>
            </Link>
          </LinkWrap>
        );
      })}
    </LinksContainer>
  );
};

export default Links;
const LinksContainer = styled("div")`
  padding-top: 1rem;
`;

const LinkWrap = styled("div")`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-width: 180px;
  /* width: auto; */
`;

const StyledLinkText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive?: boolean }>`
  color: ${({ isActive, theme }) =>
    isActive ? theme.palette.grey[300] : theme.palette.grey[500]};
  text-decoration: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 0;
  font-weight: ${({ theme }) => theme.typography.fontWeightMedium};

  &:hover {
    color: ${({ theme }) => theme.palette.grey.A200};
  }
`;
