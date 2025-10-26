"use client";

import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useIsMobileDevice } from "@/hooks/useIsMobile";
import type { ViewportBreakpoint } from "@/types/viewport";
import { type FC, type ReactNode } from "react";

type Props = {
  mobile: ReactNode | (() => ReactNode);
  desktop: ReactNode | (() => ReactNode);
  determiner?: "breakpoint" | "device";
  breakpoint?: ViewportBreakpoint;
};

const Responsive: FC<Props> = ({
  mobile,
  desktop,
  determiner = "breakpoint",
  breakpoint = "md",
}) => {
  const isBreakpoint = useBreakpoint(breakpoint);
  const isMobileDevice = useIsMobileDevice();

  const isMobileBreakpoint = !isBreakpoint;

  const isMobile =
    determiner === "breakpoint" ? isMobileBreakpoint : isMobileDevice;

  return isMobile
    ? typeof mobile === "function"
      ? mobile()
      : mobile
    : typeof desktop === "function"
      ? desktop()
      : desktop;
};

export default Responsive;
