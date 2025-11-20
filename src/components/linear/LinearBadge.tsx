import { cn } from "@/utils/styles";
import { type ComponentProps, type FC } from "react";

type LinearBadgeVariant = "default" | "accent" | "success" | "warning" | "error" | "info";
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
        "inline-flex items-center justify-center font-medium rounded-full",
        // Size variants
        size === "sm" && "h-5 px-2 text-xs",
        size === "md" && "h-6 px-2.5 text-xs",
        // Variant styles
        variant === "default" &&
          "bg-[var(--linear-bg-level2)] text-[var(--linear-text-secondary)] border border-[var(--linear-border-primary)]",
        variant === "accent" &&
          "bg-[var(--linear-accent-tint)] text-[var(--linear-accent)] border border-[var(--linear-accent)]/20",
        variant === "success" &&
          "bg-[var(--linear-semantic-green)]/10 text-[var(--linear-semantic-green)] border border-[var(--linear-semantic-green)]/20",
        variant === "warning" &&
          "bg-[var(--linear-semantic-yellow)]/10 text-[var(--linear-semantic-yellow)] border border-[var(--linear-semantic-yellow)]/20",
        variant === "error" &&
          "bg-[var(--linear-semantic-red)]/10 text-[var(--linear-semantic-red)] border border-[var(--linear-semantic-red)]/20",
        variant === "info" &&
          "bg-[var(--linear-semantic-blue)]/10 text-[var(--linear-semantic-blue)] border border-[var(--linear-semantic-blue)]/20",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default LinearBadge;

