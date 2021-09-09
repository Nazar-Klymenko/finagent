import React, { useState } from "react";
import styled from "styled-components/macro";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { useTranslation } from "react-i18next";

const LanguageMenu: React.FC = () => {
  const { i18n } = useTranslation();

  const [lang, setLang] = useState(i18n.language.slice(0, 2));

  const handleLangChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLang(event.target.value as string);
    i18n.changeLanguage(event.target.value as string);
    let date = new Date(Date.now() + 86400e3 * 90);
    let oneDayDate = date.toUTCString();
    document.cookie = `i18next=${
      event.target.value as string
    };expires=${oneDayDate}`;
  };

  return (
    <LanguageMenuStyled
      disableUnderline
      style={{
        zIndex: 999999,
        fontFamily: ["Poppins", "sans-serif"].join(","),
        width: 46,
      }}
      labelId="demo-customized-select-label"
      id="demo-customized-select"
      value={lang}
      onChange={handleLangChange}
      variant="standard"
      MenuProps={{
        disableScrollLock: true,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
        transformOrigin: {
          vertical: "top",
          horizontal: "left",
        },
        getContentAnchorEl: null,
      }}
    >
      <MenuItemStyled value={"pl"}>PL</MenuItemStyled>
      <MenuItemStyled value={"en"}>EN</MenuItemStyled>
    </LanguageMenuStyled>
  );
};

export default LanguageMenu;

const LanguageMenuStyled = styled(Select)`
  .MuiSelect-select:focus {
    background-color: unset;
  }
  .MuiInput-root {
    @media screen and (max-width: ${({ theme }) => theme.widthTablet}) {
      position: absolute;
      right: 5px;
    }
  }
`;
const MenuItemStyled = styled(MenuItem)`
  &.MuiListItem-gutters {
    padding-left: 8px;
    padding-right: 8px;
    font-family: "Poppins", sans-serif;
  }
`;
