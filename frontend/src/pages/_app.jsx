import * as React from "react";

import { appWithTranslation } from "next-i18next";
import Head from "next/head";

import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import PropTypes from "prop-types";
import { Provider } from "react-redux";

import GlobalStyles from "@styles/GlobalStyle";
import createEmotionCache from "@styles/createEmotionCache";
import muiTheme from "@styles/muiTheme";

import { AuthContextProvider } from "@context/authContext";

import store from "@redux/store";

import { Layout } from "@components/layout";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Finagent</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <GlobalStyles />
      <Provider store={store}>
        <AuthContextProvider>
          <ThemeProvider theme={muiTheme}>
            {/* <EmotionThemeProvider theme={muiTheme}> */}
            <CssBaseline />
            <Layout>
              <Component {...pageProps} />
            </Layout>
            {/* </EmotionThemeProvider> */}
          </ThemeProvider>
        </AuthContextProvider>
      </Provider>
    </CacheProvider>
  );
};

export default appWithTranslation(MyApp);
MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
