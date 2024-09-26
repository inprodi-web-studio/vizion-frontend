import { NodeResizer, NodeToolbar, Position, useReactFlow, useUpdateNodeInternals } from "@xyflow/react";
import { useEffect, useRef, useState } from "react";
import { drag } from "d3-drag";
import { select } from "d3-selection";
import { min } from "lodash";
import { Button } from "antd";
import { Gear, Trash } from "@phosphor-icons/react";

const LocationNode = ({
    id,
    selected,
    data,
}) => {
    const { deleteElements } = useReactFlow();

    const handleDelete = () => {
        deleteElements({
            nodes : [{ id }],
        });
    };

    const locationStyles = {
        display : "flex",
        alignItems : "center",
        justifyContent : "center",
        backgroundColor : "var(--token-6Lhw5mK6wolF)",
        border : "solid 3px var(--token-8lqFm4pa_96a)",
        height : "100%",
        width : "100%",
        minHeight : "200px",
        minWidth : "200px",
        borderRadius : "10px",
    };

    const tagStyles = {
        backgroundColor : "white",
        padding : "2px 8px",
        color : "var(--token-YFIqRc19SnuM)",
        borderRadius : "4px",
        fontSize : "10px",
        top : "-10px",
        fontWeight : 500,
        left : "50%",
        boxShadow : "0 0 10px rgba(0,0,0,0.06)",
        border : "1px solid var(--token-Pxe4wDL2kJpb)",
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
                <NodeResizer
                    minWidth={200}
                    minHeight={200}
                    isVisible={selected}
                />

                <div style={locationStyles}>
                    <div style={tagStyles}>
                        {data.name ?? "Ubicación"}
                    </div>
                </div>
            </div>
        </>
    );
};

export default LocationNode;