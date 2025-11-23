import { cn } from "@/utils/styles";
import { cloneElement, type ReactElement } from "react";

type Props<TProps> = {
  element: ReactElement<TProps>;
  props: Partial<TProps>;
};

function CloneElement<TProps>({ element, props }: Props<TProps>) {
  return cloneElement(element, {
    ...mergeProps({
      propsToOverride: props,
      projectedProps: element?.props,
    }),
  });

  function mergeProps({
    propsToOverride,
    projectedProps,
  }: {
    propsToOverride: Partial<TProps>;
    projectedProps: Partial<TProps>;
  }) {
    const className = (projectedProps as any)?.className;
    const classNameToOverride = (propsToOverride as any)?.className;

    return {
      ...projectedProps,
      ...propsToOverride,
      className: cn(
        typeof className === "string" && className,
        typeof classNameToOverride === "string" && classNameToOverride,
      ),
    };
  }
}

export default CloneElement;
