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
import getSlotCenterCoordinates from "@/helpers/getSlotCenterCoordinates";
import PlatformNode from "./PlatformNode";

const WarehouseViewerFlow = forwardRef(({ visible, className }, ref) => {
  const [nodes, setNodes] = useNodesState([]);
  const [focusedUuid, setFocusedUuid] = useState(null);

  const { setCenter, getNode, fitView, updateNode } = useReactFlow();

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
              zIndex: 100,
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
              zIndex: 0,
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
    setMultipleFocus: (locations) => {
      setNodes((prevNodes) => {
        const updatedNodes = [];

        locations.map(location => {
          const node = prevNodes.find(n => n.data.uuid === location.uuid);
          const nodeIndex = updatedNodes.findIndex(n => n.data.uuid === location.uuid);

          if (nodeIndex !== -1) {
            updatedNodes[nodeIndex].data.focusedIndexes.push(location.focusedIndex);
          } else {
            updatedNodes.push({
              ...node,
              data: {
                ...node.data,
                focused: true,
                multiple: true,
                focusedIndexes: [location.focusedIndex],
              },
            });
          }
        });

        return prevNodes.map(node => {
          const nodeIndex = updatedNodes.findIndex(n => n.data.uuid === node.data.uuid);

          if (nodeIndex !== -1) {
            return updatedNodes[nodeIndex];
          } else {
            return {
              ...node,
              data: {
                ...node.data,
                focused: false,
                multiple: false,
                focusedIndexes: [],
              },
            };
          }
        });
      });
    },
    focusRackSlot: (uuid, focusedIndex, zoom = 0.8, duration = 800) => {
      const rackNode = nodes.find((n) => n.data.uuid === uuid);

      const index = rackNode.data.sort === "asc" ? focusedIndex : rackNode.data.positions - focusedIndex;

      if (!rackNode) {
        console.warn("Rack no encontrado");
        return;
      }

      const locationNode = nodes.find((n) => n.id === rackNode.parentId);

      if (!locationNode) {
        console.warn("Nodo ubicación no encontrado");
        return;
      }

      const orientation = rackNode.data.orientation || "horizontal";

      const RACK_ITEM_HEIGHT = 100;
      const FLOATING_PANEL_PADDING = 20;

      const floatingPanelHeight = Number(rackNode.data.stacks) * RACK_ITEM_HEIGHT + FLOATING_PANEL_PADDING;

      const { x, y } = getSlotCenterCoordinates(rackNode, locationNode, index, orientation, floatingPanelHeight);

      setCenter(x, y, { zoom, duration });
    },
    setRackPositions: (uuid, positionsData = []) => {
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

      if (nodeObj && nodeObj.type === "location") {
        const node = getNode(nodeObj.id);
        if (node) {
          fitView({ nodes: [node], padding: 0.2, duration: 800 });
        }
      }
    }
  }, [nodes, focusedUuid, fitView, getNode]);

  const nodeTypes = {
    location: LocationNode,
    rack: RackNode,
    divider: DividerNode,
    platform : PlatformNode
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
  props: {
    visible: {
      type: "boolean",
      defaultValue: true,
    },
  },
  refActions: {
    getNodes: {
      argTypes: [],
    },
    setNodes: {
      argTypes: [
        {
          name: "nodes",
          type: "array",
        }
      ],
    },
    setMultipleFocus: {
      argTypes: [
        {
          name: "locations",
          type: "array",
        }
      ],
    },
    focusRackSlot: {
      argTypes: [
        {
          name: "uuid",
          type: "string",
        },
        {
          name: "focusedIndex",
          type: "number",
        },
        {
          name: "zoom",
          type: "number",
        },
        {
          name: "duration",
          type: "number",
        },
      ],
    },
    setRackPositions: {
      argTypes: [
        {
          name: "uuid",
          type: "string",
        },
        {
          name: "positionsData",
          type: "array",
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