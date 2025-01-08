import React, { useEffect, useMemo, useState } from "react";
import { DataProvider, GlobalActionsProvider } from "@plasmicapp/host";

export const SchemeGlobalContext = ({ children }) => {
  const [scheme, setScheme] = useState("light");

  useEffect(() => {
    const storedScheme = localStorage.getItem("scheme");
    if (storedScheme) {
      setScheme(storedScheme);
    } 
    // else {
    //   const systemPreference = window.matchMedia("(prefers-color-scheme: dark)");
    //   setScheme(systemPreference.matches ? "dark" : "light");
    // }
  }, []);

  const handleSetScheme = (newScheme) => {
    setScheme(newScheme);
    localStorage.setItem("scheme", newScheme);
  };

  const actions = useMemo(
    () => ({
      setScheme: handleSetScheme,
    }),
    []
  );

  return (
      <GlobalActionsProvider contextName="SchemeGlobalContext" actions={actions}>
        <DataProvider name="scheme" data={scheme} key={scheme}>
          {children}
        </DataProvider>
      </GlobalActionsProvider>
  );
};