import React from "react";

import Container from "@material-ui/core/Container";
// import { useTranslation } from "react-i18next";
// import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";

import { useAuth } from "@context/authContext";
import Image from "next/image";

interface Styled {
  isAuthenticated: boolean;
}

const Footer: React.FC = () => {
  // const { currentUser } = useAuth();
  // const { isLoggedIn } = currentUser;

  return (
    <FooterStyled>
      <ContainerStyled maxWidth="lg" disableGutters>
        <div className="testimonial">
          <Image height={48} width={120} src="/logo-pale.svg" alt="" />
        </div>
      </ContainerStyled>
      {/* <div className="block-container">
          <div className="block">
            <span className="header">{t("Footer.contact")}</span>
            <a className="content" href="tel:+48531937973">
              +48 531 937 973
            </a>
            <a className="content" href="tel:+48574233922">
              +48 574 233 922
            </a>
            <a className="content" href="mailto:contact@finagent.eu">
              contact@finagent.eu
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
      </ContainerStyled> */}
    </FooterStyled>
  );
};

const ContainerStyled = styled(Container)`
  display: flex;
  padding: 40px 20px;
`;

const FooterStyled = styled("footer")`
  background-color: ${({ theme }) => theme.palette.common.black};
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
export default Footer;
