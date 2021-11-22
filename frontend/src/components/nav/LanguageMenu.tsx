import React, { useState } from "react";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { useTranslation } from "react-i18next";
import styled from "styled-components/macro";

const LanguageMenu: React.FC = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language.slice(0, 2));
  const handleLangChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLang(event.target.value as string);
    i18n.changeLanguage(event.target.value as string);
    let threeMonths = new Date(Date.now() + 86400e3 * 90).toUTCString();

    document.cookie = `i18next=${
      event.target.value as string
    };expires=${threeMonths}`;
  };

  return (
    <LanguageMenuStyled
      disableUnderline
      style={{
        zIndex: 100,
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
      <MenuItemStyled value={"ua"}>UA</MenuItemStyled>
      <MenuItemStyled value={"ru"}>RU</MenuItemStyled>
    </LanguageMenuStyled>
  );
};

export default LanguageMenu;

const LanguageMenuStyled = styled(Select)`
  .MuiSelect-select:focus {
    background-color: unset;
  }
`;
const MenuItemStyled = styled(MenuItem)`
  &.MuiListItem-gutters {
    padding-left: 8px;
    padding-right: 8px;
    font-family: "Poppins", sans-serif;
  }
`;
