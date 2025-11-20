import { cn } from "@/utils/styles";
import { type ComponentProps, type FC, type ReactNode } from "react";

type LinearInputSize = "sm" | "md" | "lg";

type Props = {
  size?: LinearInputSize;
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
} & ComponentProps<"input">;

const LinearInput: FC<Props> = ({
  size = "md",
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className,
  id,
  ...props
}) => {
  const inputId = id || `linear-input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-[var(--linear-text-secondary)]"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--linear-text-tertiary)]">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={cn(
            "w-full rounded-lg border bg-[var(--linear-bg-level1)] text-[var(--linear-text-primary)]",
            "placeholder:text-[var(--linear-text-quaternary)]",
            "transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--linear-focus-ring-color)] focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            // Size variants
            size === "sm" && "h-8 px-3 text-sm",
            size === "md" && "h-10 px-3 text-sm",
            size === "lg" && "h-12 px-4 text-base",
            // Border states
            error
              ? "border-[var(--linear-semantic-red)]"
              : "border-[var(--linear-border-primary)]",
            !error &&
              "hover:border-[var(--linear-border-secondary)] focus-visible:border-[var(--linear-focus-ring-color)]",
            // Icon padding
            leftIcon && (size === "sm" ? "pl-9" : size === "md" ? "pl-10" : "pl-12"),
            rightIcon && (size === "sm" ? "pr-9" : size === "md" ? "pr-10" : "pr-12"),
            className,
          )}
          {...props}
        />
        {rightIcon && (
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--linear-text-tertiary)]">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-[var(--linear-semantic-red)]">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-[var(--linear-text-tertiary)]">{helperText}</p>
      )}
    </div>
  );
};

export default LinearInput;

