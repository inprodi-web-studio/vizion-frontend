import React, { useState, useImperativeHandle, forwardRef, useEffect } from "react";
import registerComponent, { CodeComponentMeta } from "@plasmicapp/host/registerComponent";
import { Registerable } from "./registerable";
import { PanelGroup } from "react-resizable-panels";
import { HoverProvider } from "./contexts/hoveredCell";

interface AdvancedTableProps {
    content: any;
    name: string;
    className?: string;
}

const AdvancedTable = forwardRef<any, AdvancedTableProps>(({
    name,
    content,
    className,
}, ref) => {
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {

    }, [refreshKey]);

    useImperativeHandle(ref, () => ({
        refresh: () => {
            setRefreshKey(prevKey => prevKey + 1);
        },
    }));

    return (
        <HoverProvider>
            <div className="wrapper" style={{ width: "100%", maxWidth: "100%", overflowX: "auto" }}>
                <PanelGroup
                    className={className}
                    autoSaveId={name}
                    direction="horizontal"
                    style={{ minWidth: "fit-content" }}
                >
                    {content}
                </PanelGroup>
            </div>
        </HoverProvider>
    );
});

export const advancedTableMeta: CodeComponentMeta<AdvancedTableProps> = {
    name: "AdvancedTable",
    displayName: "Advanced Table",
    props: {
        name: {
            type: "string",
        },
        content: {
            type: "slot",
            allowedComponents: ["AdvancedTableColumn"],
        },
    },
    importPath: "inprodi-design-system",
    importName: "AdvancedTable",
    refActions: {
        refresh: {
            description: "Force a re-render of the component",
            argTypes: [],
        },
    },
};

export function registerAdvancedTable(
    loader?: Registerable,
    customAdvancedTableMeta?: CodeComponentMeta<AdvancedTableProps>
) {
    const doRegisterComponent: typeof registerComponent = (...args) =>
        loader ? loader.registerComponent(...args) : registerComponent(...args);
    doRegisterComponent(AdvancedTable, customAdvancedTableMeta ?? advancedTableMeta);
}

export default AdvancedTable;