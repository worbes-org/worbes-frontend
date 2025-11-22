import ProcessingIcon from "@/svgs/ProcessingIcon";
import { cn } from "@/utils/styles";
import { useId, type ComponentProps, type FC, type ReactNode } from "react";

type InputSize = "sm" | "md" | "lg";

type Props = {
  size: InputSize;
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
} & Omit<ComponentProps<"input">, "size">;

const Input: FC<Props> = ({
  size,
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  isLoading = false,
  className,
  id,
  disabled,
  ...props
}) => {
  const generatedId = useId();
  const inputId = id || generatedId;
  const isDisabled = disabled || isLoading;

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
            "transition-colors placeholder:text-gray-400",
            "focus-visible:ring-2 focus-visible:ring-accent-700 focus-visible:ring-offset-2 focus-visible:outline-none",
            "disabled:cursor-not-allowed disabled:opacity-50",
            size === "sm" && "h-8 px-3 text-sm",
            size === "md" && "h-10 px-3 text-sm",
            size === "lg" && "h-12 px-4 text-base",
            error ? "border-red" : "border-[#23252a]",
            !error && "hover:border-[#34343a] focus-visible:border-accent-700",
            leftIcon &&
              (size === "sm" ? "pl-9" : size === "md" ? "pl-10" : "pl-12"),
            (rightIcon || isLoading) &&
              (size === "sm" ? "pr-9" : size === "md" ? "pr-10" : "pr-12"),
            className,
          )}
          disabled={isDisabled}
          aria-busy={isLoading}
          aria-invalid={!!error}
          {...props}
        />
        {isLoading ? (
          <ProcessingIcon
            className={cn(
              "pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 animate-angle-rotate text-gray-300",
              size === "lg" && "size-5",
              size !== "lg" && "size-4",
            )}
          />
        ) : (
          rightIcon && (
            <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray-300">
              {rightIcon}
            </div>
          )
        )}
      </div>
      {error && <p className="mt-1.5 text-sm text-red">{error}</p>}
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-gray-300">{helperText}</p>
      )}
    </div>
  );
};

export default Input;
