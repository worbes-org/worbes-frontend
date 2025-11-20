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
        variant === "primary" && "text-[var(--linear-text-primary)]",
        variant === "secondary" && "text-[var(--linear-text-secondary)]",
        variant === "tertiary" && "text-[var(--linear-text-tertiary)]",
        variant === "quaternary" && "text-[var(--linear-text-quaternary)]",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default LinearText;

