import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { ThemeProvider } from "styled-components";
import theme from "@styles/theme";
import GlobalStyle from "@styles/GlobalStyle";

import Navbar from "@components/navbar";
import { ContentMain } from "../components/content";
import Loader from "@components/Loader";

import Routes from "./routes";

import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContextProvider } from "@context/authContext";
const queryClient = new QueryClient();
const App = () => {
  return (
    <AuthContextProvider>
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
    </AuthContextProvider>
  );
};

export default App;
