import { useEffect, useState } from "react";

export function useWindowSize() {
  const [proportions, setProportions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    window.addEventListener("resize", () => {
      setProportions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    });
  }, []);

  return proportions;
}
