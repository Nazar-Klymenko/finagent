import React, { useState } from "react";

import { getAllLanguageSlugs, getLanguage } from "@lib/i18n";
import ArchiveIcon from "@mui/icons-material/Archive";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import i18next from "i18next";

import { archiveApplicationAPI } from "@api/applications";

const ContextMenu = ({ id, isArchived }: any): JSX.Element => {
  const { t } = i18next;
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const archiveApplication = async () => {
    await archiveApplicationAPI(id);
  };
  return (
    <>
      <IconButton disabled={isArchived} onClick={handleOpenNavMenu}>
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
            archiveApplication();
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
