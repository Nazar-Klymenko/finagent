import { useEffect, useMemo, useState } from "react";

import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";

import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { CacheProvider } from "@emotion/react";
import { defaultLanguage, languages } from "@lib/i18n";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import CssBaseline from "@mui/material/CssBaseline";
import { enUS, plPL, ruRU, ukUA } from "@mui/material/locale";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import enLocale from "date-fns/locale/en-GB";
import plLocale from "date-fns/locale/pl";
import ruLocale from "date-fns/locale/ru";
import ukLocale from "date-fns/locale/uk";
import i18next from "i18next";
import PropTypes from "prop-types";

import GlobalStyles from "@styles/GlobalStyle";
import createEmotionCache from "@styles/createEmotionCache";
import muiTheme from "@styles/muiTheme";

import { AuthContextProvider } from "@context/authContext";
import { DataProvider } from "@context/dataContext";
import { SnackbarProvider } from "@context/snackbarContext";

// import { Snackbar } from "@components/Snackbar";
import { Layout } from "@components/layout";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const localeMap = {
  en: enLocale,
  pl: plLocale,
  ru: ruLocale,
  ua: ukLocale,
};

const muiLocales = {
  en: enUS,
  pl: plPL,
  ru: ruRU,
  ua: ukUA,
};

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter();
  let currentLocale = router.locale;

  const themeWithLocale = useMemo(
    () => createTheme(muiTheme, muiLocales[currentLocale]),
    [currentLocale]
  );
  const { asPath, query } = router;

  // Detect current language
  const slug = asPath.split("/")[1];
  const langSlug = languages.includes(slug) && slug;
  const language = query.lang || langSlug || defaultLanguage;

  const [clientLanguage, setClientLanguage] = useState(language);

  useEffect(() => {
    setClientLanguage(language);
  }, [language]);

  // Don't trigger `i18next.changeLanguage()` on root folder, use `router` to redirect to the specific language
  if (asPath !== "/" && asPath !== "/404") {
    i18next.changeLanguage(clientLanguage);
  }

  return (
    <CacheProvider value={emotionCache}>
      {/*old ios polyfill */}
      <Script
        src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver"
        strategy="beforeInteractive"
      />
      <Head>
        <title>Finagent</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" type="image/x-icon" href="/images/favicon.ico" />
      </Head>
      <GlobalStyles />
      <ThemeProvider theme={themeWithLocale}>
        <EmotionThemeProvider theme={themeWithLocale}>
          <SnackbarProvider>
            <AuthContextProvider>
              <DataProvider>
                <LocalizationProvider
                  dateAdapter={DateAdapter}
                  locale={localeMap[currentLocale]}
                >
                  <CssBaseline />
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </LocalizationProvider>
              </DataProvider>
            </AuthContextProvider>
          </SnackbarProvider>
        </EmotionThemeProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
