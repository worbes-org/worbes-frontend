import { cn } from "@/utils/styles";
import { type ComponentProps, type FC } from "react";

type LinearCardVariant = "default" | "elevated" | "outlined";

type Props = {
  variant?: LinearCardVariant;
  padding?: "none" | "sm" | "md" | "lg";
} & ComponentProps<"div">;

const LinearCard: FC<Props> = ({
  variant = "default",
  padding = "md",
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "rounded-xl border transition-colors",
        // Variant styles
        variant === "default" && "border-[#23252a] bg-gray-900",
        variant === "elevated" &&
          "border-[#23252a] bg-gray-800 shadow-[0px_4px_24px_rgba(0,0,0,0.2)]",
        variant === "outlined" && "border-[#34343a] bg-transparent",
        // Padding variants
        padding === "none" && "p-0",
        padding === "sm" && "p-4",
        padding === "md" && "p-6",
        padding === "lg" && "p-8",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default LinearCard;
