import React from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

import useLayoutTranslation from "@hooks/useLayoutTranslation";

const Footer: React.FC = () => {
  const { locale } = useRouter();
  //@ts-ignore
  const { _t } = useLayoutTranslation(locale);

  return (
    <FooterStyled>
      <ContainerStyled maxWidth="lg" disableGutters>
        <LogoWrap>
          <Link href={"/dashboard/insurance"} passHref>
            <Logo>
              <Image src="/logo-pale.svg" height="44" width="90" alt="" />
            </Logo>
          </Link>
        </LogoWrap>
        <BlockContainer>
          <div className="block">
            <Typography variant="h6">{_t("Footer.contact")}</Typography>
            <a className="content" href="tel:+48531937973">
              <Typography>+48 531 937 973</Typography>
            </a>
            <a className="content" href="tel:+48574233922">
              <Typography> +48 574 233 922</Typography>
            </a>
            <a className="content" href="mailto:contact@finagent.eu">
              <Typography>contact@finagent.eu</Typography>
            </a>
          </div>

          <div className="block">
            <Typography variant="h6">{_t("Footer.help")}</Typography>
            <Link href="/help">
              <a className="content">
                <Typography>FAQ</Typography>
              </a>
            </Link>
          </div>

          <div className="block">
            <Typography variant="h6">{_t("Footer.legal")}</Typography>
            <Link href="/rodo">
              <a className="content">
                <Typography>{_t("Footer.GDPR")}</Typography>
              </a>
            </Link>
            <Link href="/privacy">
              <a className="content">
                <Typography> {_t("Footer.policy")}</Typography>
              </a>
            </Link>
            <Link href="/tos">
              <a className="content">
                <Typography> {_t("Footer.terms")}</Typography>
              </a>
            </Link>
          </div>
        </BlockContainer>
      </ContainerStyled>
    </FooterStyled>
  );
};

export { Footer };

const ContainerStyled = styled(Container)`
  display: flex;
  padding: 40px 20px;
`;

const FooterStyled = styled("footer")`
  background-color: ${({ theme }) => theme.palette.common.black};
  color: ${({ theme }) => theme.palette.grey[600]};
`;
const LogoWrap = styled("div")`
  flex: 1 3 auto;
`;
const Logo = styled("a")`
  height: 100%;
  display: flex;
  align-items: center;
`;
const BlockContainer = styled("div")`
  display: flex;
  flex: 2;
  justify-content: space-evenly;
  flex-wrap: wrap;
  .block {
    flex: 1 1 200px;
    margin-top: 20px;
  }
`;

{
  /*
  .testimonial {
    display: flex;
    flex: 1;
    flex-direction: column;
    p {
      font-size: 0.9rem;
      font-weight: 300;
      color: ${({ theme }) => theme.gray};
      padding-top: 8px;
    }
  }
  .block-container {
    display: flex;
    flex: 2;
    justify-content: space-evenly;
  }
  .block {
    display: flex;
    flex-direction: column;
    color: ${({ theme }) => theme.gray};
    font-size: 0.9rem;
    .header {
      font-size: 1rem;
      font-weight: 400;
      color: ${({ theme }) => theme.lightGray};
    }
    .content {
      cursor: pointer;
      color: ${({ theme }) => theme.gray};
      text-decoration: none;
      transition: color 0.1s ease-in-out;
      &:hover {
        color: ${({ theme }) => theme.lightGray};
      }
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.widthTablet}) {
    padding: 60px 0px 20px;
    .wrap {
      flex-direction: column-reverse;
    }
    .block-container {
      justify-content: flex-start;
      padding-bottom: 24px;
    }
    .block {
      margin-right: 32px;
      min-width: 10rem;
    }
    display: ${({ isAuthenticated }) => (isAuthenticated ? "none" : "block")};
  }
  @media screen and (max-width: ${({ theme }) => theme.widthPhone}) {
    padding: 32px 32px 20px;

    .block-container {
      flex-direction: column;
    }
    .block {
      padding: 16px 0px;
    }
  }
`;

const Copyright = styled.span`
  color: ${({ theme }) => theme.gray};
  font-size: 0.8rem;
  text-align: center;
  padding: 32px 0px 16px;
  display: block;
`;
*/
}
