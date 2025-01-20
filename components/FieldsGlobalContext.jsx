import React, { useEffect, useMemo, useState } from "react";
import { DataProvider, GlobalActionsProvider } from "@plasmicapp/host";

export const FieldsGlobalContext = ({ children }) => {
    const [fields, setFields] = useState();

    useEffect(() => {
        const storedFields = localStorage.getItem("tableFields");

        if (storedFields) {
            setFields(JSON.parse(storedFields));
        } else {
            localStorage.setItem("tableFields", JSON.stringify({
                crm : {
                    leads : [],
                    customers : [],
                    products : [],
                    estimates : [],
                    sales : []
                },
            }));
        }
    }, []);

    const actions = useMemo(() => ({
        toggleField : ( app, module, field ) => {
            setFields( prevFields => {
                const updatedFields = {
                    ...prevFields,
                    [app]: {
                        ...prevFields[app],
                        [module]: prevFields[app][module].includes(field)
                            ? prevFields[app][module].filter(f => f !== field)
                            : [...prevFields[app][module], field],
                    },
                };

                localStorage.setItem("tableFields", JSON.stringify(updatedFields));

                return updatedFields;
            });
        },
        setFields : (app, module, newFields) => {
            setFields( prevFields => {
                const updatedFields = {
                    ...prevFields,
                    [app]: {
                        ...prevFields[app],
                        [module]: newFields,
                    },
                };

                localStorage.setItem("tableFields", JSON.stringify(updatedFields));

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