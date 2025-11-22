import { cn } from "@/utils/styles";
import { type ComponentProps, type FC } from "react";

type LinearTextVariant = "primary" | "secondary" | "tertiary" | "quaternary";
type LinearTextSize = "xs" | "sm" | "base" | "lg";

type Props = {
  variant?: LinearTextVariant;
  size?: LinearTextSize;
  as?: "p" | "span" | "div" | "label";
} & ComponentProps<"p">;

const LinearText: FC<Props> = ({
  variant = "primary",
  size = "base",
  as: Component = "p",
  className,
  children,
  ...props
}) => {
  return (
    <Component
      className={cn(
        // Size variants
        size === "xs" && "text-xs",
        size === "sm" && "text-sm",
        size === "base" && "text-base",
        size === "lg" && "text-lg",
        // Color variants
        variant === "primary" && "text-gray-100",
        variant === "secondary" && "text-gray-200",
        variant === "tertiary" && "text-gray-300",
        variant === "quaternary" && "text-gray-400",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default LinearText;
