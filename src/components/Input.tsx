import ProcessingIcon from "@/svgs/ProcessingIcon";
import { cn } from "@/utils/styles";
import type { ComponentProps, FC } from "react";

type Props = {
  className?: string;
  inputClassName?: string;
  theme: "primary" | "secondary" | "clear";
  size: "xs" | "sm" | "md";
  Icon?: FC<{ className?: string }>;
  isLoading?: boolean;
} & Omit<ComponentProps<"input">, "size">;

const Input: FC<Props> = ({
  className,
  inputClassName,
  ref,
  theme,
  size = "md",
  Icon,
  isLoading,
  disabled,
  ...props
}) => {
  return (
    <div className={cn("relative", className)}>
      {Icon && (
        <Icon
          className={cn(
            "pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-white/70",
            size === "md" && "size-5",
            size === "sm" && "size-5",
            size === "xs" && "size-4",
          )}
        />
      )}

      <input
        className={cn(
          "w-full rounded-xl text-white placeholder-white/40 transition-colors outline-none",
          size === "md" && "px-4 py-3 text-sm",
          size === "sm" && "px-3 py-2.5 text-sm",
          size === "xs" && "rounded-lg px-2.5 py-2 text-xs",
          theme === "primary" && "border border-purple-500/25 bg-purple-600/10",
          theme === "primary" && "hover:bg-purple-600/15",
          theme === "primary" &&
            "focus-visible:ring-2 focus-visible:ring-purple-500",
          theme === "secondary" && "border border-blue-500/25 bg-transparent",
          theme === "secondary" && "hover:bg-blue-500/10",
          theme === "secondary" &&
            "focus-visible:ring-2 focus-visible:ring-blue-500",
          theme === "clear" && "border border-transparent bg-transparent",
          theme === "clear" && "hover:bg-blue-500/10",
          theme === "clear" &&
            "focus-visible:ring-2 focus-visible:ring-blue-500",
          disabled &&
            "cursor-not-allowed border-gray-600 bg-gray-600 text-gray-400 placeholder-gray-500",
          Icon && (size === "xs" ? "pl-8" : "pl-10"),
          isLoading && (size === "xs" ? "pr-8" : "pr-10"),
          inputClassName,
        )}
        ref={ref}
        disabled={disabled || isLoading}
        aria-busy={!!isLoading}
        {...props}
      />

      {isLoading && (
        <ProcessingIcon
          className={cn(
            "pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 animate-angle-rotate text-white/70",
            size === "md" && "size-5",
            size === "sm" && "size-5",
            size === "xs" && "size-4",
          )}
        />
      )}
    </div>
  );
};

export default Input;
