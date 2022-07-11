import React, { useState } from "react";

import { useRouter } from "next/router";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import {Tooltip} from "@components/Tooltip";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import useLayoutTranslation from "@hooks/useLayoutTranslation";

import { useAuth } from "@context/authContext";

import Link from "@components/LinkComponent";

const UserMenu = (): JSX.Element => {
  const { currentUser, logout } = useAuth();
  const router = useRouter(),
    { locale } = router;
  //@ts-ignore
  const { _t } = useLayoutTranslation(locale);
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
    <UserMenuContainer>
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
        <MenuName sx={{ px: 1 }} variant="body2">
          {displayName}
        </MenuName>
        <IconButton onClick={handleOpenNavMenu}>
          {/* <MoreVertIcon /> */}
          <ExpandMoreIcon />
        </IconButton>
      </UserContainer>
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
        disableScrollLock
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
      >
        <Link href={"/settings"} passHref>
          <MenuItemStyled onClick={handleCloseNavMenu}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <Typography component="a" variant="body2" textAlign="center">
              {_t("UserDropdown.settings")}
            </Typography>
          </MenuItemStyled>
        </Link>

        <MenuItemStyled
          onClick={() => {
            handleCloseNavMenu();
            logout();
          }}
        >
          <ListItemIcon>
            <LogoutRoundedIcon fontSize="small" />
          </ListItemIcon>

          <Typography variant="body2" textAlign="center">
            {_t("UserDropdown.signOut")}
          </Typography>
        </MenuItemStyled>
      </MenuStyled>
    </UserMenuContainer>
  );
};

export default UserMenu;

const UserMenuContainer = styled("div")`
  margin: 0 0 0 8px;
`;

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

const MenuName = styled(Typography)`
  ${({ theme }) => theme.breakpoints.down("md")} {
    display: none;
  }
`;
