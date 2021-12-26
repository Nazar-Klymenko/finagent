import React, { useEffect, useState } from "react";

import Backdrop from "@mui/material/Backdrop";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import { useMediaQuery } from "react-responsive";

import { useAuth } from "@context/authContext";

import LogoWrap from "@components/LogoWrap";
import { UserAuth } from "@components/buttons";
import Drawer from "@components/drawer/Drawer";
import { Logo } from "@components/svgs";

import Hamburger from "./Hamburger";
import LanguageMenu from "./LanguageMenu";
import Links from "./Links";
import Notifications from "./Notifications";
import UserDropdown from "./UserDropdown";

const Nav = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 992px)" });
  const classes = useStyles();

  const { currentUser } = useAuth();
  const { isLoggedIn } = currentUser;
  const [navOpen, setNavOpen] = useState(false);

  const [openBackdrop, setOpenBackdrop] = useState(false);

  const handleClose = () => {
    setOpenBackdrop(false);
  };

  useEffect(() => {
    setOpenBackdrop(navOpen);
  }, [setOpenBackdrop, navOpen]);

  useEffect(() => {
    if (!isTabletOrMobile) {
      setOpenBackdrop(false);
      setNavOpen(false);
    }
  }, [isTabletOrMobile, setOpenBackdrop]);

  return (
    <NavStyled>
      <ContainerStyled maxWidth="lg" disableGutters>
        <Backdrop
          className={classes.backdrop}
          open={openBackdrop}
          onClick={handleClose}
        />
        <FlexWrap f1 flexStart>
          <LogoWrap>
            <Logo fillColor="#1A1B1E" />
          </LogoWrap>
        </FlexWrap>

        <FlexWrap f2>
          {!isTabletOrMobile && (
            <Links navOpen={navOpen} setNavOpen={setNavOpen} />
          )}
        </FlexWrap>

        <FlexWrap f1 flexEnd>
          <LanguageMenu />
          {!isTabletOrMobile && isLoggedIn && <Notifications />}

          {!isTabletOrMobile &&
            (isLoggedIn ? (
              <UserDropdown navOpen={navOpen} setNavOpen={setNavOpen} />
            ) : (
              <UserAuth navOpen={navOpen} setNavOpen={setNavOpen} />
            ))}
        </FlexWrap>

        <Hamburger
          onClick={() => {
            setNavOpen(true);
          }}
          navOpen={navOpen}
        />
        {isTabletOrMobile && (
          <Drawer navOpen={navOpen} setNavOpen={setNavOpen} />
        )}
      </ContainerStyled>
    </NavStyled>
  );
};

export default Nav;

const ContainerStyled = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;
const NavStyled = styled("div")`
  display: flex;
  position: fixed;
  justify-content: space-between;
  align-items: center;
  justify-content: center;

  top: 0;
  left: 0;
  right: 0;
  height: 50px;

  background: white;
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
  box-shadow: 0 1px 6px 0 rgba(58, 60, 66, 0.1);
  z-index: 50;
`;
const FlexWrap = styled("div")`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: flex-end;
  height: 100%;
  align-items: center;
  ${({ flexStart }) =>
    flexStart &&
    `
      justify-content: flex-start;
    `}

  ${({ center }) =>
    center &&
    `
      justify-content: center;
    `}

  ${({ flexEnd }) =>
    flexEnd &&
    `
      justify-content: flex-end;
    `}

    ${({ f1 }) =>
    f1 &&
    `
      flex: 1;
    `}
    ${({ f2 }) =>
    f2 &&
    `
      flex: 2;
    `}
`;
const useStyles = makeStyles((theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);
