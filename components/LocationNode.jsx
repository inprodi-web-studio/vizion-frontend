import { NodeResizer, NodeToolbar, useReactFlow } from "@xyflow/react";
import { Button } from "antd";
import { Gear, Trash } from "@phosphor-icons/react";
import { useEffect } from "react";

const LocationNode = ({
    id,
    selected,
    data,
}) => {
    const { deleteElements, getNodes } = useReactFlow();

    const nodes = getNodes();
    const childNodes = nodes.filter(node => node.parentId === id);
    const hasChildren = childNodes.length > 0;

    const handleDelete = () => {
        deleteElements({
            nodes : [{id}],
        });
    };

    const locationStyles = hasChildren ? {
        backgroundColor : data.focused ? "var(--antd-colorPrimaryBg)" : "#f8f9fa",
        border : data.focused ? "solid 1px var(--antd-colorPrimary)" : "solid 1px #d9d9d9",
        borderRadius : "10px",
        height : "100%",
        width : "100%",
        minHeight : "200px",
        minWidth : "200px",
    } : {
        display : "flex",
        alignItems : "center",
        justifyContent : "center",
        backgroundColor : data.focused ? "var(--antd-colorPrimaryBg)" : "#f8f9fa",
        border : data.focused ? "solid 1px var(--antd-colorPrimary)" : "solid 1px #d9d9d9",
        height : "100%",
        width : "100%",
        minHeight : "200px",
        minWidth : "200px",
        borderRadius : "10px",
    };

    const tagStyles = {
        backgroundColor : data.focused ? "var(--antd-colorPrimary)" : "white",
        padding : "4px 12px",
        color : data.focused ? "white" : "var(--token-YFIqRc19SnuM)",
        borderRadius : "4px",
        fontSize : "16px",
        fontWeight : 600,
        border : data.focused ? "var(--antd-colorPrimary)" : "1px solid var(--token-Pxe4wDL2kJpb)",
    };

    const floatingTagStyles = {
        backgroundColor : data.focused ? "var(--antd-colorPrimary)" : "white",
        padding : "4px 12px",
        color : data.focused ? "white" : "var(--token-YFIqRc19SnuM)",
        borderRadius : "4px",
        fontSize : "16px",
        fontWeight : 600,
        border : data.focused ? "var(--antd-colorPrimary)" : "1px solid var(--token-Pxe4wDL2kJpb)",
        position : "absolute",
        top : "-40px",
    };

    return (
        <>
            <NodeToolbar
                position="bottom"
                isVisible={selected}
            >
                <div style={{
                    display : "flex",
                    alignItems : "center",
                    gap : "10px",
                }}>
                    <Button
                        type="default"
                        onClick={() => data.onLocationUpdate && data.onLocationUpdate( nodes.filter(node => node.id === id)[0] )}
                    >
                        <Gear size={16} />
                        Configurar
                    </Button>

                    <Button
                        danger
                        type="default"
                        onClick={handleDelete}
                    >
                        <Trash size={16} />
                        Eliminar
                    </Button>
                </div>
            </NodeToolbar>
            <div
                style={{
                    width : "100%",
                    height : "100%",
                    minWidth : "200px",
                    minHeight : "200px",
                }}
            >
                { hasChildren && (
                    <div style={floatingTagStyles}>
                        {data.name ?? "Ubicación"}
                    </div>
                )}
                
                <NodeResizer
                    minWidth={200}
                    minHeight={200}
                    isVisible={selected}
                />

                <div style={locationStyles}>
                    { !hasChildren && (
                        <div style={tagStyles}>
                            {data.name ?? "Ubicación"}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default LocationNode;