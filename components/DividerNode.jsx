import { Trash } from "@phosphor-icons/react";
import { NodeResizer, NodeToolbar, useReactFlow } from "@xyflow/react";
import { Button } from "antd";

const DividerNode = ({
    id,
    selected,
    data,
}) => {
    const { setNodes, getNodes } = useReactFlow();

    const handleDelete = () => {
        setNodes((nds) =>
            nds.filter((node) => node.id !== id)
        );
    };

    const dividerStyles = {
        backgroundColor : "#e9ecef",
        width : "100%",
        height : "100%",
        minWidth : "50px",
        minHeight : "50px",
        borderRadius : "10px",
        border : "solid 1px #d9d9d9",
        backgroundImage : `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 6px,
            #d9d9d9 6px,
            #d9d9d9 10px
        )`,
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
                    minWidth : "50px",
                    minHeight : "50px",
                }}
            >
                <NodeResizer
                    minWidth={50}
                    minHeight={50}
                    isVisible={selected}
                />

                <div
                    style={dividerStyles}
                />
            </div>
        </>
    );
};

export default DividerNode;