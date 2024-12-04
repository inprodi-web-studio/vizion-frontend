import React, {
    forwardRef,
    useImperativeHandle,
    useState,
    useEffect,
  } from "react";

  import {
    Background,
    ReactFlow,
    ReactFlowProvider,
    useNodesState,
    useReactFlow,
  } from "@xyflow/react";
  
  import LocationNode from "./LocationNode";
  import RackNode from "./RackNode";
  import DividerNode from "./DividerNode";
  
  const WarehouseViewerFlow = forwardRef(({ visible, className }, ref) => {
    const [nodes, setNodes] = useNodesState([]);
    const [focusedUuid, setFocusedUuid] = useState(null);
  
    const { setCenter, getNode, fitView } = useReactFlow();
  
    useImperativeHandle(ref, () => ({
      setNodes: (nodes) => {
        setNodes(nodes);
      },
      getNodes: () => {
        return nodes;
      },
      setSingleFocused: (uuid, focusedIndex, focusedStack, focusedPartition) => {
        setFocusedUuid(uuid);

        setNodes((prevNodes) =>
          prevNodes.map((node) => {
            if (node.data.uuid === uuid) {
              return {
                ...node,
                data: {
                  ...node.data,
                  focused: true,
                  focusedIndex,
                  focusedStack,
                  focusedPartition,
                },
              };
            } else if (node.data.focused) {
              return {
                ...node,
                data: {
                  ...node.data,
                  focused: false,
                  focusedIndex: null,
                  focusedStack: null,
                  focusedPartition: null,
                },
              };
            } else {
              return node;
            }
          })
        );
      },

      setRackPositions : (uuid, positionsData) => {
        setNodes((prevNodes) =>
          prevNodes.map((node) => {
            if (node.data.uuid === uuid) {
              return {
                ...node,
                data: {
                  ...node.data,
                  positionsData,
                },
              };
            } else {
              return node;
            }
          })
        );
      }
    }));
  
    useEffect(() => {
        if (focusedUuid) {
          const nodeObj = nodes.find((node) => node.data.uuid === focusedUuid);
          const node = getNode(nodeObj.id);
    
          if (node) {
            fitView({ nodes: [node], padding: 0.2, duration: 800 });
          }
        }
      }, [nodes, focusedUuid, fitView, getNode]);
  
    const nodeTypes = {
      location: LocationNode,
      rack: RackNode,
      divider: DividerNode,
    };
  
    const wrapperStyles = {
      width: "100%",
      height: "100%",
      display: visible ? "flex" : "none",
    };
  
    return (
      <div className={className} style={wrapperStyles}>
        <ReactFlow
          fitView
          snapToGrid
          minZoom={0.2}
          nodes={nodes}
          nodeTypes={nodeTypes}
          selectionKeyCode={null}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          edgesFocusable={false}
        >
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
    );
});

WarehouseViewerFlow.displayName = "WarehouseViewerFlow";

export const WarehouseViewer = forwardRef((props, ref) => (
    <ReactFlowProvider>
        <WarehouseViewerFlow {...props} ref={ref} />
    </ReactFlowProvider>
));

WarehouseViewer.displayName = "WarehouseViewer";

export const warehouseViewerMeta = {
    name: "WarehouseViewer",
    displayName: "Warehouse Viewer",
    props : {
        visible : {
            type : "boolean",
            defaultValue : true,
        },
    },
    refActions : {
        getNodes : {
            argTypes : [],
        },
        setNodes : {
            argTypes : [
                {
                    name : "nodes",
                    type : "array",
                }
            ],
        },
        setRackPositions : {
            argTypes : [
                {
                    name : "uuid",
                    type : "string",
                },
                {
                    name : "positionsData",
                    type : "array",
                }
            ],
        },
    },
    importPath: "inprodi-design-system",
    importName: "WarehouseViewer",
};

export function registerWarehouseViewer(
    loader,
    customWarehouseViewerMeta,
) {
    const doRegisterComponent = (...args) =>
        loader ? loader.registerComponent(...args) : registerComponent(...args);
    doRegisterComponent(WarehouseViewer, customWarehouseViewerMeta ?? warehouseViewerMeta);
};