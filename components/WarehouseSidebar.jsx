import { useDnD } from "@/contexts/DndContext";
import React from "react";

const WarehouseSidebar = () => {
  const [_, setType] = useDnD();

  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const sidebarStyles = {
    marginTop : "48px",
    backgroundColor : "white",
    borderLeft : "1px solid var(--token-Pxe4wDL2kJpb)",
    padding : "16px",
    width : "350px",
  };

  const headerStyles = {
    color : "black",
    fontWeight : "600",
    fontSize : "16px",
  };

  const listStyles = {
    width : "100%",
    display : "flex",
    flexDirection : "column",
    alignItems : "stretch",
    gap : "10px",
  };

  const itemStyles = {
    marginTop : "16px",
    backgroundColor : "white",
    border : "solid 1px var(--token-Pxe4wDL2kJpb)",
    borderRadius : "6px",
  };

  const containerStyles = {
    backgroundColor : "rgb(245, 245, 245)",
    height : "100px",
    borderRadius : "6px 6px 0 0",
    borderBottom : "solid 1px var(--token-Pxe4wDL2kJpb)",
    padding : "30px 30px 0 30px",
    display : "flex",
    justifyContent : "center",
    alignItems : "center",
  };

  const locationStyles = {
    display : "flex",
    alignItems : "center",
    justifyContent : "space-center",
    backgroundColor : "var(--token-6Lhw5mK6wolF)",
    border : "solid 3px var(--token-8lqFm4pa_96a)",
    borderBottom : "none",
    height : "100%",
    width : "100%",
    borderRadius : "10px 10px 0 0",
  };

  const textContainerStyles = {
    padding : "10px 16px",
  };

  const titleStyles = {
    fontWeight : 600,
    fontSize : "14px",
  };

  const descriptionStyles = {
    fontSize : "12px",
    color : "var(--token-YFIqRc19SnuM)",
  };

  const rackContainerStyles = {
    display : "flex",
    width : "100%",
    gap : "6px",
    justifyContent : "center",
    alignItems : "center",
  };

  const rackItemStyles = {
    position : "relative",
    display : "flex",
    alignItems : "flex-start",
    justifyContent : "center",
    backgroundColor : "var(--token-6Lhw5mK6wolF)",
    border : "solid 3px var(--token-8lqFm4pa_96a)",
    height : "40px",
    width : "70px",
    borderRadius : "6px",
  };

  const positionStyles = {
    width : "100%",
    height : "50%",
    backgroundColor : "rgba(0,0,0,0.15)",
    borderRadius : "3px 3px 6px 6px",
  };

  const tagStyles = {
    position : "absolute",
    top : "0",
    left : "0",
    zIndex : "10",
    backgroundColor : "white",
    padding : "2px 8px",
    color : "var(--token-YFIqRc19SnuM)",
    borderRadius : "4px",
    fontSize : "10px",
    top : "-10px",
    fontWeight : 500,
    left : "50%",
    transform : "translateX(-50%)",
    boxShadow : "0 0 10px rgba(0,0,0,0.15)",
  };

  return (
    <aside style={sidebarStyles}>
      <p style={headerStyles}>Elementos</p>
      <p style={descriptionStyles}>Arrastra y suelta los elementos para configurar el diseño de tu almacén.</p>

      <div style={listStyles}>
        <div
          draggable
          style={itemStyles}
          className="dndnode input"
          onDragStart={(event) => onDragStart(event, "location")}
        >
          <div style={containerStyles}>
            <div style={locationStyles}></div>
          </div>

          <div style={textContainerStyles}>
            <p style={titleStyles}>Ubicación</p>
            <p style={descriptionStyles}>Zonas en donde se puede almacenar productos.</p>
          </div>
        </div>
      </div>

      <div style={listStyles}>
        <div
          draggable
          style={itemStyles}
          className="dndnode input"
          onDragStart={(event) => onDragStart(event, "rack")}
        >
          <div style={containerStyles}>
            <div style={rackContainerStyles}>
              <div style={rackItemStyles}>
                <div style={tagStyles}>A1</div>
                <div style={positionStyles}></div>
              </div>
              <div style={rackItemStyles}>
                <div style={tagStyles}>A2</div>
                <div style={positionStyles}></div>
              </div>
              <div style={rackItemStyles}>
                <div style={tagStyles}>A3</div>
                <div style={positionStyles}></div>
              </div>
            </div>
          </div>

          <div style={textContainerStyles}>
            <p style={titleStyles}>Estante</p>
            <p style={descriptionStyles}>Conjunto de espacios de almacenamiento por pisos y posiciones. Solo puede ser posicionado dentro de una ubicación.</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default WarehouseSidebar;