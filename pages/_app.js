import React, { useEffect } from "react";
import { ConfigProvider } from "antd";
import { Toaster } from "sonner";

import theme from "../theme/themeConfig";

import "../styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";

import { useRouter } from "next/router";

const App = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => storePathValues, [router]);

  function storePathValues() {
    const storage = globalThis?.sessionStorage;

    // if (!storage) return;

    const prevPath = storage.getItem("currentPath");

    storage.setItem("currentPath", globalThis.location.href);
    storage.setItem("prevPath", prevPath);
  }

  return (
    <ConfigProvider theme={theme}>
      <Toaster
        richColors
        position="bottom-right"
        toastOptions={{
          duration: 4000,
        }}
      />
      <Component {...pageProps} />
    </ConfigProvider>
  );
};

export default App;