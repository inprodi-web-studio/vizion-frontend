import { ArrowClockwise, Gear, SortAscending, SortDescending, Trash } from "@phosphor-icons/react";
import { NodeToolbar, useReactFlow } from "@xyflow/react";
import { Button, Dropdown } from "antd";
import RackItem from "./RackItem";

const RackNode = ({
    id,
    selected,
    data,
}) => {

    const { setNodes, deleteElements } = useReactFlow();

    const handleDelete = () => {
        deleteElements({
            nodes: [{ id }],
        });
    };

    const {
        stacks = 1,
        positions = 1,
        identifier,
        sort,
        multiple,
        focused,
        orientation = "horizontal",
        focusedIndex,
        focusedIndexes,
        focusedStack,
        focusedPartition,
        positionsData
    } = data;

    const rackContainerStyles = {
        display: "flex",
        flexDirection: orientation === "horizontal" ? "row" : "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
    };

    const rackItemStyles = {
        borderRadius: "10px",
        height: orientation === "horizontal" ? "100px" : "200px",
        width: orientation === "horizontal" ? "200px" : "100px",
        position: "relative",
    };

    const positionIndicatorStyles = {
        width: "calc( 100% - 10px )",
        height: "calc( 100% - 10px )",
        borderRadius: "10px",
        position: "absolute",
        bottom: 5,
        left: 5,
        top: 5,
    };

    const tagStyles = {
        backgroundColor: "white",
        padding: "4px 12px",
        color: "var(--token-YFIqRc19SnuM)",
        borderRadius: "4px",
        fontSize: "16px",
        fontWeight: 600,
        left: "50%",
        border: "1px solid var(--token-Pxe4wDL2kJpb)",
        position: "absolute",
        bottom: "50%",
        transform: "translate(-50%, 50%)",
        whiteSpace: "nowrap"
    };

    const floatingRackStyles = {
        position: "absolute",
        width: "150px",
        backgroundColor: "white",
        bottom: 6,
        right: -188,
        zIndex: 100,
        borderRadius: "6px",
        border: "1px solid var(--token-Pxe4wDL2kJpb)",
        boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 3px, rgba(0, 0, 0, 0.05) 0px 36px 28px -7px, rgba(0, 0, 0, 0.04) 0px 17px 17px -7px",
        padding: "10px",
        display: "flex",
        flexDirection: "column-reverse",
        alignItems: "center",
    };

    const handleToggleSort = () => {
        setNodes((nds) =>
            nds.map((node) =>
                node.id === id ? { ...node, data: { ...node.data, sort: sort === "asc" ? "desc" : "asc" } } : node
            )
        );
    };

    const handleToggleOrientation = () => {
        setNodes((nds) =>
            nds.map((node) =>
                node.id === id ? { ...node, data: { ...node.data, orientation: orientation === "horizontal" ? "vertical" : "horizontal" } } : node
            )
        );
    };

    let index = sort === "asc" ? 0 : Number(positions) + 1;

    return (
        <>
            <NodeToolbar
                position="bottom"
                isVisible={selected}
            >
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                }}>
                    <Button
                        type="default"
                        onClick={handleToggleOrientation}
                    >
                        <ArrowClockwise size={16} />
                        Rotar
                    </Button>

                    <Button
                        type="default"
                        onClick={handleToggleSort}
                    >
                        {
                            sort === "asc" ? (
                                <SortDescending size={16} />
                            ) : (
                                <SortAscending size={16} />
                            )
                        }
                        Alternar
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

            <div style={rackContainerStyles}>
                {Array.from({ length: Number(positions) }).map(() => {
                    index = sort === "asc" ? index + 1 : index - 1;

                    return (
                        <div key={index} style={{ position : "relative" }}>
                            { focused && focusedIndex + 1 === index && !multiple && (
                                <div style={floatingRackStyles}>
                                    { Array.from({ length : Number(stacks) }).map( ( _, rackIndex ) => {
                                        const { partitions } = positionsData.find( i => i.xPosition === index - 1 && i.yPosition === rackIndex );

                                        return (
                                            <RackItem
                                                key={index}
                                                partitions={ partitions }
                                                isFocused={focusedStack === rackIndex}
                                                focusedPartition={focusedPartition}
                                            />
                                        );
                                    })}
                                </div>
                            )}

                            <div
                                style={{
                                    ...rackItemStyles,
                                    backgroundColor: (focused && (focusedIndex + 1 === index || focusedIndexes?.includes(index - 1))) ? "var(--antd-colorPrimaryBg)" : "#e9ecef",
                                    border: (focused && (focusedIndex + 1 === index || focusedIndexes?.includes(index - 1))) ? "solid 1px var(--antd-colorPrimary)" : "solid 1px #dee2e6",
                                }
                                }>
                                <div style={{
                                    ...positionIndicatorStyles,
                                    backgroundColor: (focused && (focusedIndex + 1 === index || focusedIndexes?.includes(index - 1))) ? "var(--antd-colorPrimary)" : "#ced4da",
                                }} />
                                <div style={tagStyles}>
                                    {`${identifier ?? ""}-${index}`}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default RackNode;