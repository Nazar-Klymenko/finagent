import * as React from "react";
import { Provider } from "react-redux";
import { appWithTranslation } from "next-i18next";

import store from "@redux/store";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import PropTypes from "prop-types";

import GlobalStyles from "@styles/GlobalStyle";
import createEmotionCache from "@styles/createEmotionCache";
import muiTheme from "@styles/muiTheme";

import Footer from "@components/Footer";
import { Wrapper } from "@components/layout";
import Navbar from "@components/navbar/Navbar";
import { AuthContextProvider } from "@context/authContext";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
        ></meta>
      </Head>
      <GlobalStyles />
      <Provider store={store}>
        <AuthContextProvider>
          <ThemeProvider theme={muiTheme}>
            <EmotionThemeProvider theme={muiTheme}>
              <CssBaseline />
              <Navbar />
              <Wrapper>
                <Component {...pageProps} />
              </Wrapper>
              <Footer />
            </EmotionThemeProvider>
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
