import ProcessingIcon from "@/svgs/ProcessingIcon";
import { cn } from "@/utils/styles";
import { type ComponentProps, type FC } from "react";

type Props = {
  className?: string;
  theme: "primary" | "secondary" | "clear";
  size: "xs" | "sm" | "md";
  isLoading?: boolean;
} & ComponentProps<"button">;

const Button: FC<Props> = ({
  className,
  size = "md",
  theme,
  isLoading,
  disabled,
  type = "button",
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-semibold text-white transition-colors",
        size === "md" && "px-4 py-3 text-base",
        size === "sm" && "px-3 py-2.5 text-sm",
        size === "xs" && "rounded-lg px-2.5 py-2 text-xs",
        theme === "primary" && "bg-blue-600",
        theme === "primary" &&
          !disabled &&
          "hover:bg-blue-700 active:bg-blue-800",
        theme === "primary" && disabled && "bg-gray-600 text-gray-400",
        theme === "secondary" && "border border-blue-500/25 bg-transparent",
        theme === "secondary" &&
          !disabled &&
          "hover:bg-blue-500/10 active:bg-blue-500/20",
        theme === "secondary" && disabled && "text-gray-500",
        theme === "clear" && "bg-transparent",
        theme === "clear" &&
          !disabled &&
          "hover:bg-blue-500/10 active:bg-blue-500/20",
        theme === "clear" && disabled && "text-gray-500",
        (disabled || isLoading) && "cursor-not-allowed",
        className,
      )}
      disabled={disabled || isLoading}
      type={type}
      {...props}
    >
      {isLoading ? (
        <ProcessingIcon
          className={cn(
            "animate-angle-rotate",
            size === "md" && "size-5",
            size === "sm" && "size-5",
            size === "xs" && "size-4",
          )}
        />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
