import React, { useRef } from "react";
import styled from "styled-components/macro";
import { makeStyles } from "@material-ui/core/styles";

import Links from "./Links";
import Avatar from "./Avatar";
import AuthLinks from "./AuthLinks";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import useClickOutside from "@hooks/useClickOutside";
import { useAuth } from "@context/authContext";

interface Props {
  navOpen: boolean;
  setNavOpen: (navOpen: boolean) => void;
}
interface Styled {
  navOpen: boolean;
}

const useStyles = makeStyles({
  root: {
    color: "#7d7d7d",
  },
});

const Drawer: React.FC<Props> = ({ navOpen, setNavOpen }) => {
  const classes = useStyles();
  const { currentUser } = useAuth();
  const { isLoggedIn } = currentUser;
  const wrapperRef = useRef<HTMLDivElement>(null);
  useClickOutside(navOpen, setNavOpen, wrapperRef);

  return (
    <DrawerStyled className={classes.root} ref={wrapperRef} navOpen={navOpen}>
      <CloseRoundedIcon
        onClick={() => {
          setNavOpen(false);
        }}
      />
      {isLoggedIn && <Avatar />}
      <Links navOpen={navOpen} setNavOpen={setNavOpen} />
      <AuthLinks navOpen={navOpen} setNavOpen={setNavOpen} />
    </DrawerStyled>
  );
};

export default Drawer;

const DrawerStyled = styled.div<Styled>`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: white;
  padding: 1rem;
  width: 70%;
  position: absolute;
  right: 0px;
  top: 0px;
  height: 100vh;
  transform: ${({ navOpen }) =>
    navOpen ? "translateX(0%)" : "translateX(100%)"};
  z-index: 150;
  transition: transform 0.25s ease-in-out;

  @media screen and (min-width: ${({ theme }) => theme.widthPhone}) {
    width: 40%;
  } ;
`;
