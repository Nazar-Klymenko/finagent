import React, { useEffect, useState } from "react";

import moment from "moment";
import "moment/locale/en-gb";
import "moment/locale/pl";
import "moment/locale/ru";
import "moment/locale/uk";
import { useTranslation } from "react-i18next";

export const LocalizeMoment = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState("pl");

  useEffect(() => {
    switch (i18n.language) {
      case "en":
        setLanguage("en-gb");
        break;
      case "pl":
        setLanguage("pl");
        break;
      case "ru":
        setLanguage("ru");
        break;
      case "ua":
        setLanguage("uk");
        break;
      default:
        setLanguage("pl");
    }
  }, [i18n.language, language]);
  moment.locale(language);

  return null;
};
