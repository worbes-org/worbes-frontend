import { isMobile } from "@/utils/env";
import { useState } from "react";
import { useIsomorphicLayoutEffect } from "react-use";

export function useIsMobileDevice() {
  const [isMobileDevice, setIsMobileDevice] = useState(true);

  useIsomorphicLayoutEffect(() => {
    setIsMobileDevice(isMobile());
  }, []);

  return isMobileDevice;
}
