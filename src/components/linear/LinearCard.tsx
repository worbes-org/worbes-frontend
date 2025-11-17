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
        variant === "default" &&
          "bg-[var(--linear-bg-level1)] border-[var(--linear-border-primary)]",
        variant === "elevated" &&
          "bg-[var(--linear-bg-level2)] border-[var(--linear-border-primary)] shadow-[var(--linear-shadow-medium)]",
        variant === "outlined" &&
          "bg-transparent border-[var(--linear-border-secondary)]",
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

