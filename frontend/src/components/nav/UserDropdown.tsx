import React, { useCallback, useRef, useState } from "react";

import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";

import useClickOutside from "@hooks/useClickOutside";

import { useAuth } from "@context/authContext";

import { Settings, SignOut } from "@components/svgs";

interface Props {
  navOpen: boolean;
  setNavOpen: (navOpen: boolean) => void;
}

interface Styled {
  isOpen?: boolean;
  navOpen?: boolean;
}

interface AvatarStyled {
  photoURL?: string;
}

const UserDropdown: React.FC<Props> = ({ navOpen, setNavOpen }) => {
  const { t } = useTranslation();
  const { currentUser, logout } = useAuth();
  const { displayName, isSendingRequest, photoURL } = currentUser;
  const [avatarError, setAvatarError] = useState(false);

  const history = useHistory();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  const logOutButton = () => {
    logout(() => history.push("/"));
  };

  useClickOutside(isOpen, setIsOpen, wrapperRef);

  const hadleReguralClick = useCallback(() => {
    setIsOpen(!isOpen);
    setNavOpen(false);
  }, [setIsOpen, isOpen, setNavOpen]);

  return !isSendingRequest ? (
    <UserDrop
      onClick={hadleReguralClick}
      ref={wrapperRef}
      isOpen={isOpen}
      navOpen={navOpen}
    >
      <MainUser navOpen={navOpen}>
        {photoURL && !avatarError ? (
          <AvatarFB
            onError={() => {
              setAvatarError(true);
            }}
            src={photoURL}
          />
        ) : (
          <AvatarEmail>{displayName?.[0]}</AvatarEmail>
        )}
        <span className="name">{displayName}</span>
      </MainUser>

      <Dropdown isOpen={isOpen} navOpen={navOpen}>
        {/* <MenuItem
          navOpen={navOpen}
          onClick={() => {
            setNavOpen(false);
          }}
        >
          <Profile />
          <span>{t("UserDropdown.changeProfile")}</span>
        </MenuItem> */}
        <MenuItem
          navOpen={navOpen}
          onClick={() => {
            setNavOpen(false);
            history.push("/settings/change_info");
          }}
        >
          <Settings />
          <span>{t("UserDropdown.settings")}</span>
        </MenuItem>

        <MenuItem
          navOpen={navOpen}
          onClick={() => {
            setNavOpen(false);
            logOutButton();
          }}
        >
          <span>{t("UserDropdown.signOut")}</span>
          <SignOut />
        </MenuItem>
      </Dropdown>
    </UserDrop>
  ) : (
    <UserDropLoader />
  );
};

export default UserDropdown;

const UserDrop = styled.div<Styled>`
  cursor: pointer;
  position: relative;
  height: 100%;
  transition: 0.1s;
  min-width: 200px;
  border-radius: 4px 4px 0 0;
  font-size: 15px;
  box-shadow: ${({ isOpen }) =>
    isOpen ? "0 1px 6px 0 rgba(32, 33, 36, 0.15)" : ""};
  @media screen and (max-width: ${({ theme }) => theme.widthTablet}) {
    max-width: max-content;
    border-radius: unset;
    height: unset;
  }
`;

const MainUser = styled.div<Styled>`
  display: flex;
  align-items: center;
  margin: 0px 20px 0px 8px;
  height: 49px;
  &::after {
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    right: -2px;
    top: 53%;
    transform: translate(-50%, -50%);
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid rgb(17, 0, 255);
  }

  .name {
    white-space: nowrap;
  }
  @media screen and (max-width: ${({ theme }) => theme.widthTablet}) {
    &::after {
      content: unset;
    }
  }
`;

const AvatarEmail = styled.div`
  pointer-events: none;
  display: flex;
  height: 32px;
  width: 32px;
  background: rgb(0, 47, 255);
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  font-weight: bolder;
  color: white;
  margin: 4px 8px 4px -2px;
  text-transform: uppercase;
`;

const AvatarFB = styled.img<AvatarStyled>`
  pointer-events: none;
  height: 32px;
  width: 32px;
  border-radius: 50%;
  margin: 4px 8px 4px -2px;
`;

const Dropdown = styled.div<Styled>`
  position: absolute;
  opacity: 1;
  box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.15);
  border-radius: 0 0 4px 4px;
  width: 100%;
  right: 0;
  transform: ${({ isOpen }) => (isOpen ? "scaleY(1)" : "scaleY(0)")};
  transition: 0.1s ease-in-out;
  transform-origin: top;

  &::before {
    content: "";
    height: 4px;
    width: 100%;
    position: absolute;
    top: -4px;
    background: white;
    z-index: 2;
    transform: scaleY(1);
  }
  @media screen and (max-width: ${({ theme }) => theme.widthTablet}) {
    box-shadow: unset;
    width: unset;
    right: unset;
  }
`;

const MenuItem = styled.div<Styled>`
  background: white;
  height: 50px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  transition: 0.2s;
  border-top: 1px solid ${({ theme }) => theme.lightGray};
  &:hover {
    background: ${({ theme }) => theme.lightGray};
  }
  &:last-of-type {
    justify-content: flex-end;
    border-radius: 0px 0px 4px 4px;
  }
  .user-dropdown-icon {
    margin: 0px 6px;
    height: 1.3rem;
    width: 1.3rem;
  }
  @media screen and (max-width: ${({ theme }) => theme.widthTablet}) {
    border-top: unset;
    &:last-of-type {
      justify-content: ${({ navOpen }) =>
        navOpen ? " flex-end;" : " flex-start"};
      flex-direction: ${({ navOpen }) => (navOpen ? "row-reverse" : "row")};
      margin-left: 1px;
    }
  }
`;

const UserDropLoader = styled.div`
  height: 80%;
  min-width: 190px;
  border-radius: 5px;
  background: ${({ theme }) => theme.lightGray};
`;
