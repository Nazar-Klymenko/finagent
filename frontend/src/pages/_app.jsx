import * as React from "react";

import Head from "next/head";
import { appWithTranslation } from "next-i18next";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import PropTypes from "prop-types";
import { AuthContextProvider } from "src/context/authContext";
import Script from "next/script";

import GlobalStyles from "@styles/GlobalStyle";
import createEmotionCache from "@styles/createEmotionCache";
import muiTheme from "@styles/muiTheme";

import { Layout } from "@components/layout";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      {/*old ios polyfill */}
      <Script
        src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver"
        strategy="beforeInteractive"
      />
      <Head>
        <title>My page</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <GlobalStyles />
      <ThemeProvider theme={muiTheme}>
        <EmotionThemeProvider theme={muiTheme}>
          <AuthContextProvider>
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
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
