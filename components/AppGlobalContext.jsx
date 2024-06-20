import React, { useEffect, useMemo, useState } from "react";
import { DataProvider, GlobalActionsProvider } from "@plasmicapp/host";

export const AppGlobalContext = ({ children }) => {
    const [app, setApp] = useState("crm");

    useEffect(() => {
        const storedApp = localStorage.getItem("app");

        if (storedApp) {
          setApp(storedApp);
        } else {
          setApp("crm");
        }
    }, []);

    const actions = useMemo(() => ({
        setApp : (selection) => {
            setApp(selection);
            localStorage.setItem("app", selection);
        },
    }), []);

    return (
        <GlobalActionsProvider contextName="AppGlobalContext" actions={actions}>
            <DataProvider name="app" data={app}>
                {children}
            </DataProvider>
        </GlobalActionsProvider>
    );
}