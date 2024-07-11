import React, { useEffect, useMemo, useState } from "react";
import { DataProvider, GlobalActionsProvider } from "@plasmicapp/host";

export const FieldsGlobalContext = ({ children }) => {
    const [fields, setFields] = useState();

    useEffect(() => {
        const storedFields = localStorage.getItem("fields");

        if (storedFields) {
            setFields(JSON.parse(storedFields));
        } else {
            localStorage.setItem("fields", JSON.stringify({
                crm : {
                    leads : ["email", "phones", "responsible", "rating", "group", "source", "potential", "value", "tags"],
                    customers : ["email", "phones", "responsible", "rating", "group", "source", "balance", "value", "lastSale", "tags"],
                },
            }));
        }
    }, []);

    const actions = useMemo(() => ({
        setFields : (app, module, newFields) => {
            setFields( prevFields => {
                const updatedFields = {
                    ...prevFields,
                    [app]: {
                        ...prevFields[app],
                        [module]: newFields,
                    },
                };

                localStorage.setItem("fields", JSON.stringify(updatedFields));

                return updatedFields;
            });
        },
    }), []);

    return (
        <GlobalActionsProvider contextName="FieldsGlobalContext" actions={actions}>
            <DataProvider name="fields" data={fields}>
                {children}
            </DataProvider>
        </GlobalActionsProvider>
    );
}