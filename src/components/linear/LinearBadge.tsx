import { cn } from "@/utils/styles";
import { type ComponentProps, type FC } from "react";

type LinearBadgeVariant =
  | "default"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "info";
type LinearBadgeSize = "sm" | "md";

type Props = {
  variant?: LinearBadgeVariant;
  size?: LinearBadgeSize;
} & ComponentProps<"span">;

const LinearBadge: FC<Props> = ({
  variant = "default",
  size = "md",
  className,
  children,
  ...props
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium",
        // Size variants
        size === "sm" && "h-5 px-2 text-xs",
        size === "md" && "h-6 px-2.5 text-xs",
        // Variant styles
        variant === "default" &&
          "border border-[#23252a] bg-gray-800 text-gray-200",
        variant === "accent" &&
          "border border-accent-600/20 bg-accent-950 text-accent-600",
        variant === "success" &&
          "border border-green/20 bg-green/10 text-green",
        variant === "warning" &&
          "border border-yellow/20 bg-yellow/10 text-yellow",
        variant === "error" && "border border-red/20 bg-red/10 text-red",
        variant === "info" && "border border-blue/20 bg-blue/10 text-blue",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default LinearBadge;
