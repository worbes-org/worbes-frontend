import { cn } from "@/utils/styles";
import { type FC, type PropsWithChildren } from "react";

type Props = {
  className?: string;
  theme: "primary" | "secondary" | "tertiary" | "quaternary";
  size: "xs" | "sm" | "md" | "lg";
  as?: "p" | "span" | "div" | "label";
} & PropsWithChildren;

const Text: FC<Props> = ({
  className,
  theme,
  size,
  as: Component = "p",
  children,
  ...props
}) => {
  return (
    <Component
      className={cn(
        size === "xs" && "text-xs",
        size === "sm" && "text-sm",
        size === "md" && "text-base",
        size === "lg" && "text-lg",
        theme === "primary" && "text-gray-100",
        theme === "secondary" && "text-gray-200",
        theme === "tertiary" && "text-gray-300",
        theme === "quaternary" && "text-gray-400",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Text;
