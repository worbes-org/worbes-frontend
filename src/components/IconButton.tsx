import ProcessingIcon from "@/svgs/ProcessingIcon";
import { cn } from "@/utils/styles";
import { type ComponentProps, type FC } from "react";

type Props = {
  className?: string;
  theme: "primary" | "secondary" | "clear";
  size: "xs" | "sm" | "md";
  Icon: FC<{ className?: string }>;
  isLoading?: boolean;
} & ComponentProps<"button">;

const IconButton: FC<Props> = ({
  className,
  size = "md",
  theme,
  Icon,
  isLoading,
  disabled,
  type = "button",
  onClick,
  ...props
}) => {
  return (
    <button
      className={cn(
        "rounded-xl text-white transition-colors",
        size === "md" && "p-3",
        size === "sm" && "p-2.5",
        size === "xs" && "rounded-lg p-2",
        theme === "primary" && "bg-purple-600",
        theme === "primary" &&
          !disabled &&
          "hover:bg-purple-700 active:bg-purple-800",
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
        className,
      )}
      disabled={disabled}
      type={type}
      onClick={onClick}
      {...props}
    >
      {isLoading ? (
        <ProcessingIcon
          className={cn(
            "animate-angle-rotate",
            size === "md" && "size-6",
            size === "sm" && "size-5",
            size === "xs" && "size-4",
          )}
        />
      ) : (
        <Icon
          className={cn(
            size === "md" && "size-6",
            size === "sm" && "size-5",
            size === "xs" && "size-4",
          )}
        />
      )}
    </button>
  );
};

export default IconButton;
