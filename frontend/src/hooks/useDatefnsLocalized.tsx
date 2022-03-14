import { useRouter } from "next/router";

import {
  format as dformat,
  formatDistanceToNow as dformatDistanceToNow,
} from "date-fns";
import enLocale from "date-fns/locale/en-GB";
import plLocale from "date-fns/locale/pl";
import ruLocale from "date-fns/locale/ru";
import ukLocale from "date-fns/locale/uk";

const localeMap = {
  en: enLocale,
  pl: plLocale,
  ru: ruLocale,
  ua: ukLocale,
};
const useDatefnsLocalized = () => {
  const router = useRouter(),
    { locale } = router;

  const format = (date: Date) => {
    return dformat(date, "Pp", {
      //@ts-ignore
      locale: localeMap[locale] || plLocale,
    });
  };

  const formatDistanceToNow = (date: Date) => {
    return dformatDistanceToNow(date, {
      //@ts-ignore
      locale: localeMap[locale] || plLocale,
      addSuffix: true,
    });
  };

  return { format, formatDistanceToNow };
};
export default useDatefnsLocalized;
