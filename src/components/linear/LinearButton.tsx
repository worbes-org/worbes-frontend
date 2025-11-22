import { cn } from "@/utils/styles";
import { type ComponentProps, type FC } from "react";

type Props = {
  variant?: "primary" | "secondary" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
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
        "focus-visible:ring-2 focus-visible:ring-accent-700 focus-visible:ring-offset-2 focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",

        size === "sm" && "h-8 rounded-lg px-3 text-sm",
        size === "md" && "h-10 rounded-lg px-4 text-sm",
        size === "lg" && "h-12 rounded-xl px-6 text-base",

        variant === "primary" &&
          "border border-[#23252a] bg-gray-800 text-gray-100",
        variant === "primary" && "hover:border-[#34343a] hover:bg-[#191a1b]",

        variant === "secondary" &&
          "border border-[#23252a] bg-transparent text-gray-200",
        variant === "secondary" && "hover:bg-white/5 hover:text-gray-100",

        variant === "ghost" &&
          "border border-transparent bg-transparent text-gray-200",
        variant === "ghost" && "hover:bg-white/5 hover:text-gray-100",
        variant === "accent" &&
          "border border-transparent bg-accent-600 text-white",
        variant === "accent" && "hover:bg-accent-500",
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
