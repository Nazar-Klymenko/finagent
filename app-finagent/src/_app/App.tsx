import React, { useEffect, Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { Helmet, HelmetProvider } from "react-helmet-async";

import { NotificationProvider } from "@context/notificationContext";
import { BackDropProvider } from "@context/backdropContext";

import MuiSnackbar from "@components/MuiSnackbar";

import Loader from "@components/Loader";
import Nav from "@components/nav";
import { ContentMain } from "@components/content";
import BottomNav from "@components/BottomNav";
import Footer from "@components/Footer";

import Routes from "./routes";

import { ThemeProvider } from "styled-components";
import theme from "@styles/theme";
import GlobalStyle from "@styles/GlobalStyle";

import { useDispatch } from "react-redux";
import { fetchUser } from "@redux/auth/actions";

const queryClient = new QueryClient();

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
            rel="stylesheet"
          />
        </Helmet>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <ThemeProvider theme={theme}>
            <Suspense fallback={<Loader />}>
              <GlobalStyle />
              <BackDropProvider>
                <NotificationProvider>
                  <Router>
                    {/* <PageContainer> */}
                    <Nav />
                    <ContentMain>
                      <MuiSnackbar />
                      <Routes />
                    </ContentMain>
                    <Footer />
                    <BottomNav />
                    {/* </PageContainer> */}
                  </Router>
                </NotificationProvider>
              </BackDropProvider>
            </Suspense>
          </ThemeProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </>
  );
};

export default App;
