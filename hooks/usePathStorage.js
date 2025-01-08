import { useEffect } from "react";

const usePathStorage = () => {
    useEffect(() => {
        const storage = globalThis?.sessionStorage;
        const prevPath = storage.getItem("currentPath");
        storage.setItem("currentPath", globalThis.location.href);
        storage.setItem("prevPath", prevPath);
      }, []);
};

export default usePathStorage;