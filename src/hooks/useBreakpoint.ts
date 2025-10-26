import { BREAKPOINTS } from "@/constants/viewport";
import type { ViewportBreakpoint } from "@/types/viewport";
import { useIsomorphicLayoutEffect, useMedia } from "react-use";

export function useBreakpoint(
  breakpoint: ViewportBreakpoint,
  callback?: (breakpoint: boolean) => void,
) {
  const isBreakpoint = useMedia(
    `(min-width: ${BREAKPOINTS[breakpoint]}px)`,
    true,
  );

  useIsomorphicLayoutEffect(() => {
    callback?.(isBreakpoint);
  }, [isBreakpoint, callback]);

  return isBreakpoint;
}
