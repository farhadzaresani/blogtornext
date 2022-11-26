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
import { Raleway } from "@next/font/google";

const raleway = Raleway({
  weight: "400",
});
function MyApp({ Component, pageProps }) {
  // const queryClient = new QueryClient();
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <main className={raleway.className}>
            <Navbar />
            <Component {...pageProps} />
          </main>
        </Hydrate>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
