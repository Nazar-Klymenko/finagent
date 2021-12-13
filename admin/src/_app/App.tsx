import React, { Suspense } from "react";

import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import GlobalStyle from "@styles/GlobalStyle";
import theme from "@styles/theme";

import { AuthContextProvider } from "@context/authContext";

import Loader from "@components/Loader";
import Navbar from "@components/navbar";

import { ContentMain } from "../components/content";
import Routes from "./routes";

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
