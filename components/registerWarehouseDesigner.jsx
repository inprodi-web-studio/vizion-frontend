import React, { useCallback, useRef } from "react";
import registerComponent from "@plasmicapp/host/registerComponent";

import { Background, Controls, MiniMap, ReactFlow, ReactFlowProvider, useNodesState, useReactFlow } from "@xyflow/react";
import WarehouseSidebar from "./WarehouseSidebar";
import { DnDProvider, useDnD } from "@/contexts/DndContext";

let id = 0;
const getId = () => `dndnode_${id++}`;

const WarehouseDesignerFlow = ({
    ...props
}) => {
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const { screenToFlowPosition } = useReactFlow();
    const [type] = useDnD();

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          if (!type) {
            return;
          }
    
          const position = screenToFlowPosition({
            x : event.clientX,
            y : event.clientY,
          });

          const newNode = {
            id : getId(),
            type,
            position,
            data : { label: `${type} node` },
          };
    
          setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition, type, setNodes],
    );

    const wrapperStyles = {
        width : "100%",
        height : "100%",
        display : "flex"
    };

    return (
        <div style={wrapperStyles}>
            <ReactFlow
                fitView
                nodes={nodes}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onNodesChange={onNodesChange}
            >
                <Controls />
                <MiniMap />
                <Background variant="dots" gap={12} size={1} />
            </ReactFlow>

            <WarehouseSidebar />
        </div>
    );
};

export const WarehouseDesigner = () => (
    <ReactFlowProvider>
        <DnDProvider>
            <WarehouseDesignerFlow />
        </DnDProvider>
    </ReactFlowProvider>  
);

export const warehouseDesignerMeta = {
    name: "WarehouseDesigner",
    displayName: "Warehouse Designer",
    props : {},
    importPath: "inprodi-design-system",
    importName: "WarehouseDesigner",
};

export function registerWarehouseDesigner(
    loader,
    customWarehouseDesignerMeta,
) {
    const doRegisterComponent = (...args) =>
        loader ? loader.registerComponent(...args) : registerComponent(...args);
    doRegisterComponent(WarehouseDesigner, customWarehouseDesignerMeta ?? warehouseDesignerMeta);
}