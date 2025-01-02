import React, { useEffect, useState } from "react";
import { ConfigProvider, theme as AntdTheme } from "antd";
import { Toaster } from "sonner";
import updateLocale from "dayjs/plugin/updateLocale";
import locale from "antd/locale/es_ES";
import dayjs from "dayjs";
import "dayjs/locale/es-mx";

dayjs.extend(updateLocale);
dayjs.locale("es-mx");
dayjs.updateLocale("es-mx", {
  weekStart : 1,
});


import theme from "../theme/themeConfig";

import "../styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";

import "@xyflow/react/dist/style.css";

import { useRouter } from "next/router";

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  const [primaryColor, setPrimaryColor] = useState("#1677ff");
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedColor = localStorage.getItem("primaryColor");
    const scheme = localStorage.getItem("scheme");

    if (storedColor) {
      setPrimaryColor(storedColor);
    } else {
      setPrimaryColor("#1677ff");
    }

    if (scheme) {
      setIsDarkMode(scheme === "dark");
    }

    storePathValues();
  }, [router]);

  function storePathValues() {
    const storage = globalThis?.sessionStorage;

    const prevPath = storage.getItem("currentPath");

    storage.setItem("currentPath", globalThis.location.href);
    storage.setItem("prevPath", prevPath);
  }

  const themeConfig = theme(isDarkMode);

  return (
    <ConfigProvider theme={{
      ...themeConfig,
      algorithm: isDarkMode ? AntdTheme.darkAlgorithm : AntdTheme.defaultAlgorithm,
      token : {
        ...themeConfig.token,
        colorPrimary : primaryColor,
      },
    }} locale={locale}>
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