import { cn } from "@/utils/styles";
import { type ComponentProps, type FC } from "react";

type Props = {
  theme: "primary" | "secondary" | "tertiary" | "quaternary";
  size: "sm" | "md" | "lg";
  isLoading?: boolean;
} & ComponentProps<"button">;

const Button: FC<Props> = ({
  theme,
  size,
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
        theme === "primary" &&
          "border border-[#23252a] bg-gray-800 text-gray-100",
        theme === "primary" && "hover:border-[#34343a] hover:bg-[#191a1b]",
        theme === "secondary" &&
          "border border-[#23252a] bg-transparent text-gray-200",
        theme === "secondary" && "hover:bg-white/5 hover:text-gray-100",
        theme === "tertiary" &&
          "border border-transparent bg-transparent text-gray-200",
        theme === "tertiary" && "hover:bg-white/5 hover:text-gray-100",
        theme === "quaternary" &&
          "border border-transparent bg-accent-600 text-white",
        theme === "quaternary" && "hover:bg-accent-500",
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

export default Button;
