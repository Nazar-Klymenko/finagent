import React, { useState } from "react";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const LanguageMenu: React.FC = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language.slice(0, 2));

  const handleLangChange = (event: any) => {
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
  z-index: 100;
  font-family: "Poppins", "sans-serif";
  width: 46px;
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
