"use client";

import { ProgressProvider } from "@bprogress/next/app";
import { FC, type PropsWithChildren } from "react";

const PageTransitionIndicatorProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <ProgressProvider
      color="var(--color-accent-700)"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </ProgressProvider>
  );
};

export default PageTransitionIndicatorProvider;
