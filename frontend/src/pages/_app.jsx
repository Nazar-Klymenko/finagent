import React, { useMemo } from "react";
import { createTheme } from "@mui/material/styles";

import Head from "next/head";
import { appWithTranslation } from "next-i18next";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import PropTypes from "prop-types";
import { AuthContextProvider } from "@context/authContext";
import { DataProvider } from "@context/dataContext";

import Script from "next/script";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import GlobalStyles from "@styles/GlobalStyle";
import createEmotionCache from "@styles/createEmotionCache";
import muiTheme from "@styles/muiTheme";

import { Layout } from "@components/layout";
import { useRouter } from "next/router";
import DateAdapter from "@mui/lab/AdapterDateFns";

import plLocale from "date-fns/locale/pl";
import ruLocale from "date-fns/locale/ru";
import ukLocale from "date-fns/locale/uk";
import enLocale from "date-fns/locale/en-GB";
import { plPL, ukUA, enUS, ruRU } from "@mui/material/locale";

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
      </Head>
      <GlobalStyles />
      <ThemeProvider theme={themeWithLocale}>
        <EmotionThemeProvider theme={themeWithLocale}>
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
        </EmotionThemeProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
export default appWithTranslation(MyApp);

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
