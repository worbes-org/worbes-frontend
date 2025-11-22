import { cn } from "@/utils/styles";
import { type ComponentProps, type FC } from "react";

type Props = {
  theme: "default" | "elevated" | "outlined";
  size: "none" | "sm" | "md" | "lg";
} & ComponentProps<"div">;

const Card: FC<Props> = ({ theme, size, className, children, ...props }) => {
  return (
    <div
      className={cn(
        "rounded-xl border transition-colors",
        theme === "default" && "border-[#23252a] bg-gray-900",
        theme === "elevated" &&
          "border-[#23252a] bg-gray-800 shadow-[0px_4px_24px_rgba(0,0,0,0.2)]",
        theme === "outlined" && "border-[#34343a] bg-transparent",
        size === "none" && "p-0",
        size === "sm" && "p-4",
        size === "md" && "p-6",
        size === "lg" && "p-8",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
