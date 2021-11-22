import React, { Suspense } from "react";

import { ThemeProvider as MuiThemeProvider } from "@material-ui/core";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "@styles/GlobalStyle";
import muiTheme from "@styles/muiTheme";
import theme from "@styles/theme";

import { ProviderComposer, provider } from "@helpers/combineProviders";

import ScrollToTop from "@hooks/ScrollToTop";

import { AuthContextProvider } from "@context/authContext";
import { DataProvider } from "@context/dataContext";
import { NotificationProvider } from "@context/notificationContext";

import BottomNav from "@components/BottomNav";
import Footer from "@components/Footer";
import Loader from "@components/Loader";
import { LocalizeMoment } from "@components/LocalizeMoment";
import MuiSnackbar from "@components/MuiSnackbar";
import { ContentMain } from "@components/content";
import Nav from "@components/nav";

import Routes from "./routes";

const queryClient = new QueryClient();

const App = () => {
  return (
    <ProviderComposer
      providers={[
        provider(HelmetProvider),
        provider(AuthContextProvider),
        provider(DataProvider),
        provider(NotificationProvider),
        provider(ThemeProvider, { theme: theme }),
        provider(MuiThemeProvider, { theme: muiTheme }),
        provider(QueryClientProvider, { client: queryClient }),
      ]}
    >
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <ReactQueryDevtools initialIsOpen={false} />
      <Suspense fallback={<Loader />}>
        <GlobalStyle />
        <LocalizeMoment />
        <Router>
          <ScrollToTop />
          <Nav />
          <ContentMain>
            <MuiSnackbar />
            <Routes />
          </ContentMain>
          <Footer />
          <BottomNav />
        </Router>
      </Suspense>
    </ProviderComposer>
  );
};

export default App;
