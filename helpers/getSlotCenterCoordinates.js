/**
 * Calcula las coordenadas absolutas (x, y) del centro de una posición (slot) específica en un rack.
 * @param {Object} rackNode - Nodo del rack (contiene rackNode.position {x, y} relativo a su ubicación).
 * @param {Object} locationNode - Nodo de la ubicación padre (contiene locationNode.position {x, y} absoluto).
 * @param {number} slotIndex - Índice de la posición a enfocar (0-indexed, 0 para la primera posición).
 * @param {"horizontal"|"vertical"} orientation - Orientación del rack ("horizontal" o "vertical").
 * @returns {{x: number, y: number}} Coordenadas absolutas del centro de la posición especificada.
 */
const getSlotCenterCoordinates = (rackNode, locationNode, slotIndex, orientation) => {
    // 1. Posición absoluta de la esquina superior izquierda del rack
    const rackBaseX = locationNode.position.x + rackNode.position.x;
    const rackBaseY = locationNode.position.y + rackNode.position.y;
    
    // 2. Dimensiones de slot según orientación
    const slotWidth = orientation === 'horizontal' ? 200 : 100;
    const slotHeight = orientation === 'horizontal' ? 100 : 200;
    
    // 3. Cálculo del offset al centro del slot dentro del rack
    let offsetX = 0;
    let offsetY = 0;
    if (orientation === 'horizontal') {
      // desplazamiento horizontal según el índice, slots alineados en X
      offsetX = slotIndex * slotWidth + slotWidth / 2;
      offsetY = slotHeight / 2;
    } else {
      // desplazamiento vertical según el índice, slots alineados en Y
      offsetX = slotWidth / 2;
      offsetY = slotIndex * slotHeight + slotHeight / 2;
    }
    
    // 4. Coordenadas absolutas del centro del slot
    const centerX = rackBaseX + offsetX;
    const centerY = rackBaseY + offsetY;
    
    return { x: centerX, y: centerY };
}

export default getSlotCenterCoordinates;