import * as React from "react";

import { appWithTranslation } from "next-i18next";
import { AppProps } from "next/app";
import Head from "next/head";

import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import PropTypes from "prop-types";
import { Provider } from "react-redux";

import GlobalStyles from "@styles/GlobalStyle";
import createEmotionCache from "@styles/createEmotionCache";
import muiTheme from "@styles/muiTheme";

import { AuthContextProvider } from "@context/authContext";

import store from "@redux/store";

import { Wrapper } from "@components/layout";
import { Navbar } from "@components/navbar";

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
const MyApp = (props: MyAppProps) => {
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
            <CssBaseline />
            <Navbar />
            <Wrapper>
              <Component {...pageProps}></Component>
            </Wrapper>
            {/* <Layout>
              <Component {...pageProps} />
            </Layout> */}
          </ThemeProvider>
        </AuthContextProvider>
      </Provider>
    </CacheProvider>
  );
};

//@ts-ignore
export default appWithTranslation(MyApp);
MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
