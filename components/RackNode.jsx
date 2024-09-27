import { ArrowClockwise, Gear, SortAscending, SortDescending, Trash } from "@phosphor-icons/react";
import { NodeToolbar, useReactFlow } from "@xyflow/react";
import { Button } from "antd";

const RackNode = ({
    id,
    selected,
    data,
}) => {

    const { setNodes, deleteElements, getNodes } = useReactFlow();

    const nodes = getNodes();

    const handleDelete = () => {
        deleteElements({
            nodes : [{id}],
        });
    };

    const {
        stacks = 1,
        positions = 1,
        identifier,
        sort,
        orientation = "horizontal",
    } = data;

    const rackContainerStyles = {
        display : "flex",
        flexDirection : orientation === "horizontal" ? "row" : "column",
        alignItems : "center",
        justifyContent : "center",
        gap : "10px",
    };

    const rackItemStyles = {
        borderRadius : "10px",
        height : orientation === "horizontal" ? "100px" : "200px",
        width : orientation === "horizontal" ? "200px" : "100px",
        backgroundColor : "#e9ecef",
        position : "relative",
        border : "solid 1px #dee2e6"
    };

    const positionIndicatorStyles = {
        width : "calc( 100% - 10px )",
        height : "calc( 100% - 10px )",
        backgroundColor : "#ced4da",
        borderRadius : "10px",
        position : "absolute",
        bottom : 5,
        left : 5,
        top : 5,
    };

    const tagStyles = {
        backgroundColor : "white",
        padding : "4px 12px",
        color : "var(--token-YFIqRc19SnuM)",
        borderRadius : "4px",
        fontSize : "16px",
        fontWeight : 600,
        left : "50%",
        border : "1px solid var(--token-Pxe4wDL2kJpb)",
        position : "absolute",
        bottom : "50%",
        transform : "translate(-50%, 50%)",
        whiteSpace : "nowrap"
    };

    const handleToggleSort = () => {
        setNodes((nds) =>
            nds.map((node) =>
              node.id === id ? { ...node, data: { ...node.data, sort : sort === "asc" ? "desc" : "asc" } } : node
            )
        );
    };

    const handleToggleOrientation = () => {
        setNodes((nds) =>
            nds.map((node) =>
              node.id === id ? { ...node, data: { ...node.data, orientation : orientation === "horizontal" ? "vertical" : "horizontal" } } : node
            )
        );
    };

    let index = sort === "asc" ? 0 : Number( positions ) + 1;
    
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
                        onClick={ () => data.onRackUpdate && data.onRackUpdate( nodes.filter( i => i.id === id )[0] ) }
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
                { Array.from({ length : Number(positions) }).map( () => {
                    index = sort === "asc" ? index + 1 : index - 1;

                    return (
                        <div style={rackItemStyles} key={index}>
                            <div style={positionIndicatorStyles} />
                            <div style={tagStyles}>
                                { `${identifier ?? ""}-${ index }` }
                            </div>
                        </div>
                    );
                }) }
            </div>
        </>
    );
}

export default RackNode;