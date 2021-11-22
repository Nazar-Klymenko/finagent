import React from "react";

import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import styled from "styled-components/macro";

import { useAuth } from "@context/authContext";

import LogoWrap from "@components/LogoWrap";
import { Logo } from "@components/svgs";

interface Styled {
  isAuthenticated: boolean;
}

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const { isLoggedIn } = currentUser;

  return (
    <FooterStyled isAuthenticated={isLoggedIn}>
      <div className="wrap">
        <div className="testimonial">
          <LogoWrap>
            <Logo fillColor="#CDCDCD" />
          </LogoWrap>
          <p>{t("Footer.content")}</p>
        </div>
        <div className="block-container">
          <div className="block">
            <span className="header">{t("Footer.contact")}</span>
            <a className="content" href="tel:+48 222 021 432">
              +48 222 021 432
            </a>
            <a className="content" href="tel:+48 222 021 432">
              +48 222 021 432
            </a>
            <a className="content" href="mailto:finagent@gmail.com">
              finagent@gmail.com
            </a>
          </div>

          <div className="block">
            <span className="header">{t("Footer.help")}</span>
            <NavLink className="content" to="/help">
              FAQ
            </NavLink>
          </div>

          <div className="block">
            <span className="header">{t("Footer.legal")}</span>
            <NavLink className="content" to="/rodo">
              {t("Footer.GDPR")}
            </NavLink>
            <NavLink className="content" to="/privacy">
              {t("Footer.policy")}
            </NavLink>
            <NavLink className="content" to="/tos">
              {t("Footer.terms")}
            </NavLink>
          </div>
        </div>
      </div>
      <Copyright>© {new Date().getFullYear()} FinAgent</Copyright>
    </FooterStyled>
  );
};

const FooterStyled = styled.footer<Styled>`
  background-color: ${({ theme }) => theme.black};
  padding: 100px 40px 20px;

  .wrap {
    display: flex;
    margin: 0 auto;
    max-width: 1080px;
    @media (min-width: 1200px) {
      max-width: 1200px;
    }
  }
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
    padding: 60px 60px 20px;
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
  padding: 32px 0px 0px;
  display: block;
`;

export default Footer;
