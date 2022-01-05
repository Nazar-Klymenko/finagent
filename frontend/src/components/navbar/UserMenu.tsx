import React, { useState } from "react";

import Tooltip from "@components/Tooltip";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import Link from "next/link";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Container,
  IconButton,
  LinearProgress,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";

import { useAuth } from "@context/authContext";

const UserMenu = (): JSX.Element => {
  const { currentUser, logout } = useAuth();
  const { displayName, isSendingRequest, photoURL } = currentUser;
  const [avatarError, setAvatarError] = useState(false);

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  return (
    <>
      <Tooltip title="Account">
        <UserContainer>
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
          <Typography sx={{ px: 1 }} variant="body2">
            {displayName}
          </Typography>
          <IconButton onClick={handleOpenNavMenu}>
            <MoreVertIcon />
          </IconButton>
        </UserContainer>
      </Tooltip>
      <MenuStyled
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
      >
        <Link href={"/settings"} passHref>
          <MenuItemStyled onClick={handleCloseNavMenu}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <Typography component="a" variant="body2" textAlign="center">
              Settings
            </Typography>
          </MenuItemStyled>
        </Link>
        <MenuItemStyled onClick={handleCloseNavMenu}>
          <ListItemIcon>
            <LogoutRoundedIcon fontSize="small" />
          </ListItemIcon>

          <Typography variant="body2" textAlign="center">
            Logout
          </Typography>
        </MenuItemStyled>
      </MenuStyled>
    </>
  );
};

export default UserMenu;

const UserContainer = styled("div")`
  display: flex;
  align-items: center;
`;

const MenuStyled = styled(Menu)`
  .MuiMenu-list {
    /* padding: 0; */
  }
  .MuiMenu-paper {
    border: 1px solid ${({ theme }) => theme.palette.divider};
    box-shadow: none;
  }
`;

const MenuItemStyled = styled(MenuItem)`
  padding: 8px 14px;
`;
const AvatarEmail = styled("div")`
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

const AvatarFB = styled("img")`
  pointer-events: none;
  height: 32px;
  width: 32px;
  border-radius: 50%;
  margin: 4px 8px 4px -2px;
`;
