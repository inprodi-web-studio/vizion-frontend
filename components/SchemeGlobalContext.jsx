import React, { useEffect, useMemo, useState } from "react";
import { DataProvider, GlobalActionsProvider } from "@plasmicapp/host";

export const SchemeGlobalContext = ({ children }) => {
    const [scheme, setScheme] = useState("light");

    useEffect(() => {
        const storedScheme = localStorage.getItem("scheme");

        if (storedScheme) {
            setScheme(storedScheme);
        } else {
            setScheme("light");
        }
    }, []);

    const actions = useMemo(() => ({
        setScheme : (selection) => {
            setScheme(selection);
            localStorage.setItem("scheme", selection);
        },
    }), []);

    return (
        <GlobalActionsProvider contextName="SchemeGlobalContext" actions={actions}>
            <DataProvider name="scheme" data={scheme}>
                {children}
            </DataProvider>
        </GlobalActionsProvider>
    );
}