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
} & Omit<ComponentProps<"input">, "size">;

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
  const inputId =
    id || `linear-input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-gray-200"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-300">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={cn(
            "w-full rounded-lg border bg-gray-900 text-gray-100",
            "placeholder:text-gray-400",
            "transition-colors",
            "focus-visible:ring-2 focus-visible:ring-accent-700 focus-visible:ring-offset-2 focus-visible:outline-none",
            "disabled:cursor-not-allowed disabled:opacity-50",
            // Size variants
            size === "sm" && "h-8 px-3 text-sm",
            size === "md" && "h-10 px-3 text-sm",
            size === "lg" && "h-12 px-4 text-base",
            // Border states
            error ? "border-red" : "border-[#23252a]",
            !error && "hover:border-[#34343a] focus-visible:border-accent-700",
            // Icon padding
            leftIcon &&
              (size === "sm" ? "pl-9" : size === "md" ? "pl-10" : "pl-12"),
            rightIcon &&
              (size === "sm" ? "pr-9" : size === "md" ? "pr-10" : "pr-12"),
            className,
          )}
          {...props}
        />
        {rightIcon && (
          <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-300">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="mt-1.5 text-sm text-red">{error}</p>}
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-gray-300">{helperText}</p>
      )}
    </div>
  );
};

export default LinearInput;
