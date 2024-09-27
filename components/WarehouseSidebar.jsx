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
    cursor : "grab",
  };

  const containerStyles = {
    backgroundColor : "rgb(245, 245, 245)",
    height : "100px",
    borderRadius : "6px 6px 0 0",
    borderBottom : "solid 1px var(--token-Pxe4wDL2kJpb)",
    padding : "0px 30px 0 30px",
    display : "flex",
    justifyContent : "center",
    alignItems : "center",
  };

  const locationStyles = {
    display : "flex",
    marginTop : "30px",
    alignItems : "center",
    justifyContent : "space-center",
    backgroundColor : "var(--token-6Lhw5mK6wolF)",
    border : "solid 2px var(--token-8lqFm4pa_96a)",
    borderBottom : "none",
    height : "calc(100% - 30px)",
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
    border : "solid 2px var(--token-8lqFm4pa_96a)",
    height : "40px",
    width : "70px",
    padding : "2px",
    borderRadius : "6px",
  };

  const dividerContainerStyles = {
    backgroundColor : "#e9ecef",
    width : "90%",
    height : "65px",
    borderRadius : "6px",
    border : "solid 1px #d9d9d9",
    backgroundImage : `repeating-linear-gradient(
        45deg,
        transparent,
        transparent 6px,
        #d9d9d9 6px,
        #d9d9d9 10px
    )`,
  };

  const positionStyles = {
    width : "100%",
    height : "100%",
    backgroundColor : "rgba(0,0,0,0.15)",
    borderRadius : "4px",
  };

  const tagStyles = {
    position : "absolute",
    zIndex : "10",
    backgroundColor : "white",
    padding : "2px 8px",
    color : "var(--token-YFIqRc19SnuM)",
    borderRadius : "4px",
    fontSize : "10px",
    top : "50%",
    left : "50%",
    fontWeight : 500,
    transform : "translate(-50%, -50%)",
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

      <div style={listStyles}>
        <div
          draggable
          style={itemStyles}
          className="dndnode input"
          onDragStart={(event) => onDragStart(event, "divider")}
        >
          <div style={containerStyles}>
            <div style={dividerContainerStyles} />
          </div>

          <div style={textContainerStyles}>
            <p style={titleStyles}>Divisor</p>
            <p style={descriptionStyles}>Un elemento visual sencillo para dividir áreas (un muro por ejemplo).</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default WarehouseSidebar;