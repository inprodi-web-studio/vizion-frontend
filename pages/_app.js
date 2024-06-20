import React from "react";
import { ConfigProvider } from "antd";
import { Toaster } from "sonner";
import { SpinnerGap } from "@phosphor-icons/react";

import theme from "../theme/themeConfig";

import "../styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import { CircleNotch } from "@phosphor-icons/react/dist/ssr";


const App = ({ Component, pageProps }) => (
  <ConfigProvider theme={theme}>
    <Toaster
      richColors
      position="bottom-right"
      toastOptions={{
        duration : 4000
      }}
    />
    <Component {...pageProps} />
  </ConfigProvider>
);

export default App;