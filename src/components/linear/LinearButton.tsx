import { cn } from "@/utils/styles";
import { type ComponentProps, type FC } from "react";

type LinearButtonVariant = "primary" | "secondary" | "ghost" | "accent";
type LinearButtonSize = "sm" | "md" | "lg";

type Props = {
  variant?: LinearButtonVariant;
  size?: LinearButtonSize;
  isLoading?: boolean;
} & ComponentProps<"button">;

const LinearButton: FC<Props> = ({
  variant = "primary",
  size = "md",
  isLoading,
  disabled,
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-medium transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--linear-focus-ring-color)] focus-visible:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        // Size variants
        size === "sm" && "h-8 rounded-lg px-3 text-sm",
        size === "md" && "h-10 rounded-lg px-4 text-sm",
        size === "lg" && "h-12 rounded-xl px-6 text-base",
        // Primary variant
        variant === "primary" &&
          "bg-[var(--linear-bg-level2)] text-[var(--linear-text-primary)] border border-[var(--linear-border-primary)]",
        variant === "primary" &&
          "hover:bg-[var(--linear-bg-level3)] hover:border-[var(--linear-border-secondary)]",
        // Secondary variant
        variant === "secondary" &&
          "bg-transparent text-[var(--linear-text-secondary)] border border-[var(--linear-border-primary)]",
        variant === "secondary" &&
          "hover:bg-[var(--linear-bg-translucent)] hover:text-[var(--linear-text-primary)]",
        // Ghost variant
        variant === "ghost" &&
          "bg-transparent text-[var(--linear-text-secondary)] border border-transparent",
        variant === "ghost" &&
          "hover:bg-[var(--linear-bg-translucent)] hover:text-[var(--linear-text-primary)]",
        // Accent variant
        variant === "accent" &&
          "bg-[var(--linear-accent)] text-white border border-transparent",
        variant === "accent" &&
          "hover:bg-[var(--linear-accent-hover)]",
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        children
      )}
    </button>
  );
};

export default LinearButton;

