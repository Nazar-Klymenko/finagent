import React from "react";
import "@styles/global.css";

import { AlertProvider } from "@context/alertContext";

import MuiSnackbar from "@components/MuiSnackbar";
import Container from "@components/Container";
import Nav from "@components/nav/Nav";
import Footer from "@components/Footer";
import { appWithTranslation } from "next-i18next";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }) {
  return (
    <AlertProvider>
      <Nav />
      <MuiSnackbar />
      <Container>
        <Component {...pageProps} />
      </Container>
      <Footer />
    </AlertProvider>
  );
}

export default appWithTranslation(MyApp);
