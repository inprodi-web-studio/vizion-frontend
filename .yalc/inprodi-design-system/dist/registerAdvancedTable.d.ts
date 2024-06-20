import React from "react";
import { CodeComponentMeta } from "@plasmicapp/host/registerComponent";
import { Registerable } from "./registerable";
interface AdvancedTableProps {
    content: any;
    name: string;
    className?: string;
}
declare const AdvancedTable: React.ForwardRefExoticComponent<AdvancedTableProps & React.RefAttributes<any>>;
export declare const advancedTableMeta: CodeComponentMeta<AdvancedTableProps>;
export declare function registerAdvancedTable(loader?: Registerable, customAdvancedTableMeta?: CodeComponentMeta<AdvancedTableProps>): void;
export default AdvancedTable;
