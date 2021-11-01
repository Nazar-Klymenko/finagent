import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { ThemeProvider } from "styled-components";
import theme from "@styles/theme";
import GlobalStyle from "@styles/GlobalStyle";

import Navbar from "@components/navbar";
import { ContentMain } from "../components/content";
import Loader from "@components/Loader";

import Routes from "./routes";

import { useDispatch } from "react-redux";
import { fetchUser } from "@redux/auth/actions";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<Loader />}>
          <GlobalStyle />

          <Router>
            <Navbar />
            <ContentMain>
              <Routes></Routes>
            </ContentMain>
          </Router>
        </Suspense>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
