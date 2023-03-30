import "../styles/globals.css";
import { store } from "../store/store";
import { Provider } from "react-redux";
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query";
import React from "react";
import Navbar from "../components/layouts/Navbar";
import Head from "next/head";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "../components/layouts/Footer";
import { Box } from "@mui/system";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3C4048",
    },
    secondary: {
      main: "#FF8A65",
    },
  },
});

function MyApp({ Component, pageProps }) {
  // const queryClient = new QueryClient();
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <ThemeProvider theme={theme}>
              <Navbar />
              <main>
                <Component {...pageProps} />
              </main>
              <Footer />
            </ThemeProvider>
          </Hydrate>
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default MyApp;
