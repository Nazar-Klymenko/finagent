import React, { useState } from "react";

import { useTranslation } from "next-i18next";

import ArchiveIcon from "@mui/icons-material/Archive";
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

const ContextMenu = (): JSX.Element => {
  const { t } = useTranslation();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  return (
    <>
      <IconButton onClick={handleOpenNavMenu}>
        <MoreVertIcon />
      </IconButton>
      <MenuStyled
        id="app-context"
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
        <MenuItemStyled
          onClick={() => {
            handleCloseNavMenu();
          }}
        >
          <ListItemIcon>
            <ArchiveIcon fontSize="small" />
          </ListItemIcon>

          <Typography variant="body2" textAlign="center">
            {t("ApplicationOpen.Archive.button")}
          </Typography>
        </MenuItemStyled>
      </MenuStyled>
    </>
  );
};

export { ContextMenu };

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
