import { useEffect, useState } from "react";

const usePrimaryColor = () => {
    const [primaryColor, setPrimaryColor] = useState("#1677ff");

    useEffect(() => {
      const storedColor = localStorage.getItem("primaryColor");
      if (storedColor) setPrimaryColor(storedColor);
    }, []);
  
    return primaryColor;
};

export default usePrimaryColor;