import { NodeResizer, NodeToolbar, useReactFlow } from "@xyflow/react";
import { Button, Image } from "antd";
import { ArrowClockwise, Gear, Trash } from "@phosphor-icons/react";

const PlatformNode = ({
    id,
    selected,
    data,
}) => {
    const {orientation, onPlatformUpdate} = data;

    const { deleteElements, getNodes, setNodes } = useReactFlow();

    const nodes = getNodes();

    const platformDoorStyles = {
        height : "300px",
        width : "30px",
        backgroundColor : data.focused ? "solid 1px var(--antd-colorPrimary)" : "#D9D9D9",
        zIndex : 10,
        borderRadius : "6px",
    };

    const platformLocationStyles = {
        height : "260px",
        width : "270px",
        backgroundColor : data.focused ? "var(--antd-colorPrimaryBg)" : "#f8f9fa",
        border : data.focused ? "solid 1px var(--antd-colorPrimary)" : "solid 1px #d9d9d9",
        borderLeft : "none",
        borderRadius : "0 10px 10px 0",
        display : "flex",
        alignItems : "center",
        justifyContent : "center",
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

    const orientations = ["left", "top", "right", "bottom"];

    const handleDelete = () => {
        deleteElements({
            nodes : [{id}],
        });
    };

    const handleToggleOrientation = () => {
        setNodes((nds) =>
            nds.map((node) => {
                if (node.id === id) {
                    const currentIndex = node.data.orientation ? orientations.indexOf(node.data.orientation) : 0;
                    const nextIndex = currentIndex === 3 ? 0 : currentIndex + 1;
                    const nextOrientation = orientations[nextIndex];

                    return { ...node, data: { ...node.data, orientation: nextOrientation } };
                }

                return node;
            })
        );
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
                        onClick={() => onPlatformUpdate && onPlatformUpdate( nodes.filter(node => node.id === id)[0] )}
                    >
                        <Gear size={16} />
                        Configurar
                    </Button>

                    <Button
                        type="default"
                        onClick={handleToggleOrientation}
                    >
                        <ArrowClockwise size={16} />
                        Rotar
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
                    display : "flex",
                    flexDirection : "row",
                    alignItems : "center",
                    justifyContent : "center",
                    rotate : orientation === "left" ? "0deg" : orientation === "top" ? "90deg" : orientation === "right" ? "180deg" : "270deg",
                }}
            >   
                <Image
                    alt="truck"
                    preview={false}
                    src="https://img.plasmic.app/img-optimizer/v1/img?src=https%3A%2F%2Fimg.plasmic.app%2Fimg-optimizer%2Fv1%2Fimg%2Fc54e5fd6e15a595f825e90f75f8b9d3e.png&q=75&f=webp"
                    style={{
                        transform : "rotate(-90deg)",
                        height : "400px",
                        position : "relative",
                        right : "40px",
                    }}
                />

                <div style={platformDoorStyles}>

                </div>

                <div style={ platformLocationStyles }>
                    <div style={{
                        ...tagStyles,
                        rotate : orientation === "left" ? "0deg" : orientation === "top" ? "-90deg" : orientation === "right" ? "-180deg" : "-270deg",
                    }}>
                        {data.name}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PlatformNode;