import React, { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import registerComponent from "@plasmicapp/host/registerComponent";

import { Background, Controls, MiniMap, ReactFlow, ReactFlowProvider, useNodesState, useReactFlow } from "@xyflow/react";
import WarehouseSidebar from "./WarehouseSidebar";
import { DnDProvider, useDnD } from "../contexts/DnDContext";
import LocationNode from "./LocationNode";
import RackNode from "./RackNode";
import DividerNode from "./DividerNode";

let id = 0;
const getId = () => `dndnode_${id++}`;

const WarehouseDesignerFlow = forwardRef(
    ({ onNodeDelete, onLocationAdd, onRackAdd, onLocationUpdate, onRackUpdate, ...props }, ref) => {
      const [nodes, setNodes, onNodesChange] = useNodesState([]);
      const { screenToFlowPosition, deleteElements } = useReactFlow();
      const [type] = useDnD();
  
    const nodeTypes = {
        location: LocationNode,
        rack : RackNode,
        divider : DividerNode,
    };
  
      const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
      }, []);

      const handleNodeDelete = (items) => {
        onNodeDelete(items);
        return false;
      };
  
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

          if (type === "rack") {
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
                ...( type === "location" && ({
                    onLocationUpdate,
                })),
                ...( type === "rack" && ({
                    onRackUpdate,
                })),
            },
            parentId : parentNode ? parentNode.id : null,
            extent : "parent",
            expandParent : true,
          };
  
          setNodes((nds) => nds.concat(newNode));
  
          if (type === "location") {
            onLocationAdd && onLocationAdd(newNode);
          }

          if (type === "rack") {
            onRackAdd && onRackAdd(newNode);
          }
        },
        [screenToFlowPosition, type, setNodes, onLocationAdd, nodes, onRackAdd, onLocationUpdate, onRackUpdate]
      );
  
      useImperativeHandle(ref, () => ({
        deleteNode: (nodeId) => {
            setNodes((nds) =>
                nds.filter((node) => node.id !== nodeId && node.parentId !== nodeId)
            );
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
            snapToGrid
            minZoom={0.2}
            nodes={nodes}
            onDrop={onDrop}
            deleteKeyCode={null}
            nodeTypes={nodeTypes}
            selectionKeyCode={null}
            onDragOver={onDragOver}
            onNodesChange={onNodesChange}
            onBeforeDelete={onNodeDelete && ((items) => handleNodeDelete(items))}
          >
            <Controls />
            <MiniMap
                pannable
                nodeColor={node => node.type === "location" ? "#CED4D9" : node.type === "rack" ? "#E9ECEF" : "#868e96"}
            />
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
        onLocationUpdate : {
            type : "eventHandler",
            argTypes : [
                {
                    name : "node",
                    type : "object",
                }
            ],
        },
        onRackAdd : {
            type : "eventHandler",
            argTypes : [
                {
                    name : "node",
                    type : "object",
                }
            ],
        },
        onRackUpdate : {
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