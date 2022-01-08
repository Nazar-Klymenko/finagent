import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import useLayoutTranslation from "@hooks/useLayoutTranslation";
import Link from "next/link";
import { useRouter } from "next/router";

import { links } from "./config";

const Links = (): JSX.Element => {
  const { locale, asPath } = useRouter();
  //@ts-ignore
  const { _t } = useLayoutTranslation(locale);

  function CheckActiveLink(array: string[]) {
    return array.includes(asPath);
  }

  return (
    <>
      {links.map((link, idx) => {
        console.log(link);
        return (
          <Link key={idx} href={link.href} passHref>
            <StyledLinkText
              as="a"
              variant="body1"
              isActive={CheckActiveLink(link.activePaths)}
            >
              {_t(link.label)}
            </StyledLinkText>
          </Link>
        );
      })}
    </>
  );
};

export default Links;

const StyledLinkText = styled(Typography)<{ isActive?: boolean }>`
  color: ${({ isActive, theme }) =>
    isActive ? theme.palette.text.primary : theme.palette.text.secondary};
  text-decoration: none;
  padding: 8px;
  font-weight: ${({ theme }) => theme.typography.fontWeightMedium};
  border-bottom: 2px solid
    ${({ isActive, theme }) =>
      isActive ? theme.palette.primary.main : "transparent"};

  &:hover {
    color: ${({ theme }) => theme.palette.text.primary};
  }
`;
