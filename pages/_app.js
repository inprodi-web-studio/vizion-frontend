import React, { useEffect, useMemo, useState } from "react";
import { ConfigProvider, theme as AntdTheme } from "antd";
import { Toaster } from "sonner";

import updateLocale from "dayjs/plugin/updateLocale";
import locale from "antd/locale/es_ES";
import dayjs from "dayjs";
import "dayjs/locale/es-mx";
dayjs.extend(updateLocale);
dayjs.locale("es-mx");
dayjs.updateLocale("es-mx", {
  weekStart: 1,
});

import theme from "../theme/themeConfig";

import "../styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond/dist/filepond.min.css";
import "@xyflow/react/dist/style.css";


import { useRouter } from "next/router";
import { SchemeGlobalContext, useSchemeContext} from "@/components/SchemeGlobalContext";

import { useSelector } from "@plasmicapp/host";
import { PlasmicComponent, PlasmicRootProvider } from "@plasmicapp/loader-nextjs";
import appShellPropsDictionary from "@/helpers/appShellPropsDictionary";
import { PLASMIC } from "@/plasmic-init";
import { match } from "path-to-regexp";

function App({ Component, pageProps }) {
  return (
    <SchemeGlobalContext>
      <InnerApp Component={Component} pageProps={pageProps} />
    </SchemeGlobalContext>
  );
}

function InnerApp({ Component, pageProps }) {
  const router = useRouter();

  const [primaryColor, setPrimaryColor] = useState("#1677ff");

  const scheme = useSelector("scheme");
  const isDarkMode = scheme === "dark";

  useEffect(() => {
    const storedColor = localStorage.getItem("primaryColor");
    if (storedColor) {
      setPrimaryColor(storedColor);
    }
    storePathValues();
  }, [router]);

  function storePathValues() {
    if (typeof sessionStorage !== "undefined") {
      const storage = sessionStorage;
      const prevPath = storage.getItem("currentPath");
      storage.setItem("currentPath", globalThis.location.href);
      storage.setItem("prevPath", prevPath);
    }
  }

  const ROUTES_WITH_APP_SHELL = useMemo(() => [
    "/crm/dashboard",
    "/crm/contacts/leads",
    "/crm/contacts/leads/:path",
    "/crm/contacts/customers",
    "/crm/contacts/customers/:path",
    "/crm/catalogue/products",
    "/crm/catalogue/products/new",
    "/crm/catalogue/products/:path",
    "/crm/catalogue/products/edit/:path",
    "/crm/estimates",
    "/crm/estimates/new",
    "/crm/estimates/:path/:path",
    "/crm/estimates/:path/:path/edit",
    "/crm/sales",
    "/crm/sales/new",
    "/crm/sales/:path",
    "/crm/sales/:path/edit",
    "/stocks/dashboard",
    "/stocks/warehouses",
    "/stocks/warehouses/:path/layout",
    "/stocks/inventories",
    "/stocks/movements",
    "/stocks/dispatches",
  ], []);

  const baseUrl = router.asPath.split('?')[0];

  const shouldShowAppShell = ROUTES_WITH_APP_SHELL.some((routePattern) => {
    const matcher = match(routePattern, { decode: decodeURIComponent });
    const matched = matcher(baseUrl);
    return matched !== false;
  });

  const themeConfig = theme(isDarkMode);

  const AppShellProps = useMemo(() => {
    return ROUTES_WITH_APP_SHELL.reduce((acc, routePattern) => {
      const matcher = match(routePattern, { decode: decodeURIComponent });
      const matched = matcher(router.asPath);
      if (matched) {
        const baseRoute = routePattern.split('/:')[0];
        return { ...acc, ...(appShellPropsDictionary[baseRoute] || {}) };
      }
      return acc;
    }, {});
  }, [router.asPath, ROUTES_WITH_APP_SHELL]);

  return (
    <ConfigProvider
      locale={locale}
      theme={{
        ...themeConfig,
        algorithm: scheme === "dark" ? AntdTheme.darkAlgorithm : AntdTheme.defaultAlgorithm,
        token: {
          ...themeConfig.token,
          colorPrimary: primaryColor,
        },
      }}
    >
      <PlasmicRootProvider
        loader={PLASMIC}
        globalVariants={[{ name: "Scheme", value: scheme }]}
        globalContextsProps={{
          antdConfigProviderProps : {
            colorPrimary : primaryColor,
          },
        }}
      >
        <Toaster
          richColors
          theme={ scheme }
          position="bottom-right"
          toastOptions={{ duration: 4000 }}
        />

        {shouldShowAppShell ? (
          <PlasmicComponent
            component="AppShell"
            componentProps={{
              ...AppShellProps,
              pagePath : baseUrl,
              pageContent: <Component {...pageProps} />,
            }}
          />
        ) : (
          <Component {...pageProps} />
        )}

      </PlasmicRootProvider>
    </ConfigProvider>
  );
}

export default App;