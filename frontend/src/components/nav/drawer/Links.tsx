import React from "react";
import styled from "styled-components/macro";

import { NavLink } from "react-router-dom";
// import { useTranslation } from "react-i18next";

// import { useSelector } from "react-redux";

import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
// import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";

import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import { useAuth } from "@context/authContext";

interface Props {
  navOpen: boolean;
  setNavOpen: (navOpen: boolean) => void;
}

const Links: React.FC<Props> = ({ navOpen, setNavOpen }) => {
  // const { t } = useTranslation();
  const { currentUser } = useAuth();
  const { isLoggedIn } = currentUser;
  const hadleReguralClick = () => {
    setNavOpen(false);
  };

  return (
    <LinksStyled>
      {/* {isLoggedIn && (
        <Link to="/help">
          <GroupRoundedIcon />
          <span>Change Account</span>
        </Link>
      )} */}

      <Link onClick={hadleReguralClick} to="/services">
        <AssignmentRoundedIcon />
        <span>Services</span>
      </Link>

      <Link onClick={hadleReguralClick} to="/help">
        <HelpRoundedIcon />
        <span>Help</span>
      </Link>
      <Link onClick={hadleReguralClick} to="/contact">
        <PhoneRoundedIcon />
        <span>Contact</span>
      </Link>
    </LinksStyled>
  );
};

const LinksStyled = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex: 1;
  flex-direction: column;
  @media screen and (max-width: ${({ theme }) => theme.widthPhone}) {
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
