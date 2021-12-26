import React from "react";

import { styled } from "@mui/material/styles";

const Hamburger = ({ navOpen, onClick }) => {
  return (
    <HamburgerIcon navOpen={navOpen} onClick={onClick}>
      <div className="bar1"></div>
      <div className="bar2"></div>
      <div className="bar3"></div>
    </HamburgerIcon>
  );
};

const HamburgerIcon = styled("div")`
  display: none;
  cursor: pointer;
  padding: 4px 8px;
  div {
    width: 28px;
    height: 3px;
    background-color: ${({ theme }) => theme.palette.text.primary};
    margin: 7px 0;
    transition: 0.3s ease-in-out;
    border-radius: 5px;
  }
  .bar1 {
    transform: ${({ navOpen }) =>
      navOpen ? "rotate(-45deg) translate(-6px, 8px)" : ""};
  }
  .bar2 {
    opacity: ${({ navOpen }) => (navOpen ? "0" : "1")};
  }
  .bar3 {
    transform: ${({ navOpen }) =>
      navOpen ? "rotate(45deg) translate(-6px, -8px)" : ""};
  }
  @media screen and (max-width: 992px) {
    display: inline;
  }
`;

export default Hamburger;
