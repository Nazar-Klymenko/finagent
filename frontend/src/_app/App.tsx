import React, { useEffect, Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { Helmet, HelmetProvider } from "react-helmet-async";
import { DataProvider } from "@context/dataContext";
import { AuthContextProvider } from "@context/authContext";

import { NotificationProvider } from "@context/notificationContext";
import { BackDropProvider } from "@context/backdropContext";

import MuiSnackbar from "@components/MuiSnackbar";

import Loader from "@components/Loader";
import Nav from "@components/nav";
import { ContentMain } from "@components/content";
import BottomNav from "@components/BottomNav";
import Footer from "@components/Footer";

import Routes from "./routes";
import { StyledEngineProvider } from "@mui/material";
// import { ThemeProvider } from "styled-components";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@styles/theme";
import GlobalStyle from "@styles/GlobalStyle";

import ScrollToTop from "@hooks/ScrollToTop";

import { ProviderComposer, provider } from "@helpers/combineProviders";
import { LocalizeMoment } from "@components/LocalizeMoment";

const queryClient = new QueryClient();

const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <ProviderComposer
          providers={[
            provider(HelmetProvider),
            provider(AuthContextProvider),
            provider(DataProvider),
            provider(NotificationProvider),
            provider(BackDropProvider),
            // provider(ThemeProvider, { theme: theme }),
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
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
