import React from "react";

// import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import { useAuth } from "@context/authContext";

interface Props {
  navOpen: boolean;
  setNavOpen: (navOpen: boolean) => void;
}

const Links: React.FC<Props> = ({ navOpen, setNavOpen }) => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const { isLoggedIn } = currentUser;
  const hadleReguralClick = () => {
    setNavOpen(false);
  };

  return (
    <LinksStyled>
      {!isLoggedIn && (
        <>
          <Link onClick={hadleReguralClick} to="/services">
            <AssignmentRoundedIcon />
            <span> {t("Navbar.services")}</span>
          </Link>

          <Link onClick={hadleReguralClick} to="/help">
            <HelpRoundedIcon />
            <span> {t("Navbar.help")}</span>
          </Link>
          <Link onClick={hadleReguralClick} to="/contact">
            <PhoneRoundedIcon />
            <span>{t("Navbar.contact")}</span>
          </Link>
        </>
      )}
    </LinksStyled>
  );
};

const LinksStyled = styled("div")`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex: 1;
  flex-direction: column;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.values.sm}) {
    padding: 12px 0;
  }
`;

const Link = styled(NavLink)`
  padding: 12px 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  span {
    margin-left: 0.5rem;
  }
`;

export default Links;
