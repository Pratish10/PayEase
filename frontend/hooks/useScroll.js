import { useEffect, useState } from "react";

const useScroll = () => {
  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateScrollPosition = () => {
        setScrollX(window.scrollX);
        setScrollY(window.scrollY);
      };

      window.addEventListener("scroll", updateScrollPosition);
      updateScrollPosition();

      return () => {
        window.removeEventListener("scroll", updateScrollPosition);
      };
    }
  }, []);

  return { scrollX, scrollY };
};

export default useScroll;
