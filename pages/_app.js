import React, { useEffect, useState } from "react";
import { ConfigProvider } from "antd";
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

  useEffect(() => {
    const storedColor = localStorage.getItem("primaryColor");

    if (storedColor) {
      setPrimaryColor(storedColor);
    }

    storePathValues();
  }, [router]);

  function storePathValues() {
    const storage = globalThis?.sessionStorage;

    const prevPath = storage.getItem("currentPath");

    storage.setItem("currentPath", globalThis.location.href);
    storage.setItem("prevPath", prevPath);
  }

  return (
    <ConfigProvider theme={{
      ...theme,
      token : {
        ...theme.token,
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