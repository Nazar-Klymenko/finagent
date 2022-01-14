import React, { useEffect, useState } from "react";

import { i18n, useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import { MenuItem, Select, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const LanguageMenu = (): JSX.Element => {
  const router = useRouter(),
    { locale, asPath } = router;

  const [lang, setLang] = useState(locale);

  const handleLangChange = (event: any) => {
    setLang(event.target.value as string);
    router.push(asPath, asPath, { locale: event.target.value });
  };
  return (
    <LanguageMenuStyled
      disableUnderline
      id="language-select"
      value={lang}
      onChange={handleLangChange}
      variant="standard"
      MenuProps={{
        disableScrollLock: true,
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "right",
        },
        transformOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      }}
    >
      <MenuItem value="pl">
        <Typography variant="body2" textAlign="center">
          PL
        </Typography>
      </MenuItem>
      <MenuItem value="en">
        <Typography variant="body2" textAlign="center">
          EN
        </Typography>
      </MenuItem>
      <MenuItem value="ua">
        <Typography variant="body2" textAlign="center">
          UA
        </Typography>
      </MenuItem>
      <MenuItem value="ru">
        <Typography variant="body2" textAlign="center">
          RU
        </Typography>
      </MenuItem>
    </LanguageMenuStyled>
  );
};
const LanguageMenuStyled = styled(Select)`
  font-family: "Poppins", sans-serif;
  margin: 0 8px 0 0;
  box-shadow: none !important;

  .MuiPaper-root {
    box-shadow: none !important;
  }
  .MuiSelect-standard {
    padding: 6px 24px 4px 0px;
    box-shadow: none !important;
  }
  .MuiSelect-select:focus {
    background-color: unset;
  }
`;

export default LanguageMenu;
