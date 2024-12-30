import React, { useEffect, useMemo, useState } from "react";
import { DataProvider, GlobalActionsProvider } from "@plasmicapp/host";

export const LayoutGlobalContext = ({ children }) => {
    const [layout, setLayout] = useState({
        collapsed : false,
    });

    useEffect(() => {
        const storedLayout = localStorage.getItem("layout");

        if (storedLayout) {
            setLayout( JSON.parse(storedLayout) );
        }
    }, []);

    const actions = useMemo(() => ({
        setLayout : (key, value) => {
            setLayout({
                ...layout,
                [key] : value
            });

            localStorage.setItem("layout", JSON.stringify({
                ...layout,
                [key] : value
            }));
        },
    }), [layout]);

    return (
        <GlobalActionsProvider contextName="LayoutGlobalContext" actions={actions}>
            <DataProvider name="layout" data={layout}>
                {children}
            </DataProvider>
        </GlobalActionsProvider>
    );
}