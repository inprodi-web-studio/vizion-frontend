import React, { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import registerComponent from "@plasmicapp/host/registerComponent";

import { Background, Controls, MiniMap, ReactFlow, ReactFlowProvider, useNodesState, useReactFlow } from "@xyflow/react";
import WarehouseSidebar from "./WarehouseSidebar";
import { DnDProvider, useDnD } from "@/contexts/DndContext";
import LocationNode from "./LocationNode";

let id = 0;
const getId = () => `dndnode_${id++}`;

const WarehouseDesignerFlow = forwardRef(
    ({ onNodeDelete, onLocationAdd, ...props }, ref) => {
      const [nodes, setNodes, onNodesChange] = useNodesState([]);
      const { screenToFlowPosition, deleteElements } = useReactFlow();
      const [type] = useDnD();
  
      const nodeTypes = { location: LocationNode };
  
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
            x: event.clientX,
            y: event.clientY,
          });

          let parentNode = null;
          let foundNode = false;

          for (const node of nodes) {
            if (node.type === "location") {
              const nodeX = node.position.x;
              const nodeY = node.position.y;
              const nodeWidth = node.width || 200;
              const nodeHeight = node.height || 200;
      
              if (
                position.x >= nodeX &&
                position.x <= nodeX + nodeWidth &&
                position.y >= nodeY &&
                position.y <= nodeY + nodeHeight
              ) {
                parentNode = node;
                foundNode = true;
                break;
              }
            }
          }

          if ( !foundNode && type === "rack" ) return;
  
          const newNode = {
            id: getId(),
            type,
            position : parentNode
            ? {
                x: position.x - parentNode.position.x,
                y: position.y - parentNode.position.y,
              }
            : position,
            data : {
                name : "Ubicación",
            },
            parentId : parentNode ? parentNode.id : null,
            extent : "parent",
            expandParent : true,
          };
  
          setNodes((nds) => nds.concat(newNode));
  
          if (type === "location") {
            onLocationAdd && onLocationAdd(newNode);
          }
        },
        [screenToFlowPosition, type, setNodes, onLocationAdd, nodes]
      );
  
      useImperativeHandle(ref, () => ({
        deleteNode: (nodeId) => {
            console.log("triggered");
            deleteElements({
                nodes : [{ id : nodeId }],
            });
        },
        updateNodeData: (nodeId, newData) => {
            setNodes((nds) =>
              nds.map((node) =>
                node.id === nodeId ? { ...node, data: { ...node.data, ...newData } } : node
              )
            );
        },
      }));
  
      const wrapperStyles = {
        width: "100%",
        height: "100%",
        display: "flex",
      };
  
      return (
        <div style={wrapperStyles}>
          <ReactFlow
            fitView
            nodes={nodes}
            onDrop={onDrop}
            nodeTypes={nodeTypes}
            onDragOver={onDragOver}
            onNodesChange={onNodesChange}
            onNodesDelete={(nodes) => onNodeDelete && onNodeDelete(nodes)}
          >
            <Controls />
            <MiniMap />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
  
          <WarehouseSidebar />
        </div>
      );
    }
  );

  WarehouseDesignerFlow.displayName = "WarehouseDesignerFlow";

  export const WarehouseDesigner = forwardRef((props, ref) => (
    <ReactFlowProvider>
      <DnDProvider>
        <WarehouseDesignerFlow {...props} ref={ref} />
      </DnDProvider>
    </ReactFlowProvider>
  ));

  WarehouseDesigner.displayName = "WarehouseDesigner";

export const warehouseDesignerMeta = {
    name: "WarehouseDesigner",
    displayName: "Warehouse Designer",
    props : {
        onNodeDelete : {
            type : "eventHandler",
            argTypes : [
                {
                    name : "deletedNodes",
                    type : "array",
                }
            ],
        },
        onLocationAdd : {
            type : "eventHandler",
            argTypes : [
                {
                    name : "node",
                    type : "object",
                }
            ],
        },
    },
    refActions : {
        deleteNode : {
            argTypes : [
                {
                    name : "id",
                    type : "string",
                },
            ],
        },
        updateNodeData : {
            argTypes : [
                {
                    name : "id",
                    type : "string",
                },
                {
                    name : "newData",
                    type : "object",
                },
            ],
        },
    },
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