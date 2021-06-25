import React, { useState, useRef, useCallback } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";

import { Profile, Settings, SignOut } from "@components/svgs";
import useClickOutside from "@hooks/useClickOutside";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "@redux/auth/actions";

interface Styled {
  isOpen?: boolean;
}

const UserDropdown = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { displayName, isSendingRequest, role } = useSelector(
    (state: any) => state.user
  );

  const history = useHistory();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  useClickOutside(isOpen, setIsOpen, wrapperRef);

  const hadleReguralClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [setIsOpen, isOpen]);

  const logOut = () => {
    dispatch(logout());
  };

  return !isSendingRequest ? (
    <UserDrop onClick={hadleReguralClick} ref={wrapperRef} isOpen={isOpen}>
      <MainUser>
        <div className="avatar">{displayName?.[0]}</div>
        <span className="name">{displayName}</span>
      </MainUser>

      <Dropdown isOpen={isOpen}>
        {!isSendingRequest && role === "supervisor" && (
          <MenuItem onClick={() => history.push("/operators/all")}>
            <Profile />
            <span>{t("UserDropdown.operators")}</span>
          </MenuItem>
        )}

        <MenuItem
          onClick={() => {
            history.push("/settings/change_info");
          }}
        >
          <Settings />
          <span>{t("UserDropdown.settings")}</span>
        </MenuItem>

        <MenuItem onClick={logOut}>
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

const MainUser = styled.div`
  display: flex;
  align-items: center;
  margin: 0px 20px 0px 8px;
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
  .avatar {
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

const MenuItem = styled.div`
  background: white;
  padding: 10px 4px;
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
  }
`;

const UserDropLoader = styled.div`
  height: 100%;
  min-width: 190px;
  border-radius: 5px;
  background: ${({ theme }) => theme.lightGray};
  @media screen and (max-width: ${({ theme }) => theme.widthTablet}) {
    height: 60px;
  }
`;
