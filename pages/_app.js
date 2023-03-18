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
      <Head>
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
        />
      </Head>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <ThemeProvider theme={theme}>
              <Box
                sx={{
                  height: "100vh",
                  overflowY: "auto",
                  scrollSnapType: " x mandatory",
                }}
              >
                <Navbar />
                <main>
                  <Component {...pageProps} />
                </main>
                <Footer />
              </Box>
            </ThemeProvider>
          </Hydrate>
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default MyApp;
