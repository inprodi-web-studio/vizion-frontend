import { useEffect, useState } from "react";

const useURLChange = () => {
  const [url, setUrl] = useState(typeof window !== "undefined" ? window.location.href : "");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new MutationObserver(() => {
      if (window.location.href !== url) {
        setUrl(window.location.href);
      }
    });

    observer.observe(document, { subtree: true, childList: true });

    return () => observer.disconnect();
  }, [url]);

  return url;
};

export default useURLChange;