import CloneElement from "@/components/CloneElement";
import ProcessingIcon from "@/svgs/ProcessingIcon";
import { cn } from "@/utils/styles";
import {
  MouseEvent,
  ReactElement,
  useId,
  type ComponentProps,
  type FC,
  type ReactNode,
} from "react";

type Props = {
  size: "sm" | "md" | "lg";
  label?: string;
  error?: string;
  helperText?: ReactNode;
  leftIcon?: ReactElement<ComponentProps<"svg">>;
  rightIcon?: ReactElement<ComponentProps<"svg">>;
  isLoading?: boolean;
} & Omit<ComponentProps<"input">, "size">;

const Input: FC<Props> = ({
  className,
  size,
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  isLoading,
  id,
  disabled,
  ...props
}) => {
  const generatedId = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id || generatedId}
          className="mb-1.5 block text-sm font-medium text-gray-200"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <CloneElement
            element={leftIcon}
            props={{
              className: cn(
                "absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-300",
                leftIcon.type !== "button" && "pointer-events-none",
              ),
              onClick: handleIconClick,
            }}
          />
        )}
        <input
          id={id || generatedId}
          className={cn(
            "w-full rounded-lg border bg-gray-900 text-gray-100",
            "transition-colors placeholder:text-gray-400 focus-visible:outline-none",
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
          disabled={disabled || isLoading}
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
            <CloneElement
              element={rightIcon}
              props={{
                className: cn(
                  "absolute top-1/2 right-3 size-4 -translate-y-1/2 text-gray-300",
                  rightIcon.type !== "button" && "pointer-events-none",
                ),
                onClick: handleIconClick,
              }}
            />
          )
        )}
      </div>
      {error && <p className="mt-1.5 text-sm text-red">{error}</p>}
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-gray-300">{helperText}</p>
      )}
    </div>
  );

  function handleIconClick(e: MouseEvent<SVGSVGElement>) {
    if (rightIcon?.props?.onClick) {
      e.stopPropagation();
      rightIcon.props.onClick(e);
    }
  }
};

export default Input;
