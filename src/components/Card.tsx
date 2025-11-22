import { cn } from "@/utils/styles";
import { PropsWithChildren, type FC } from "react";

type Props = {
  className?: string;
  theme: "primary" | "secondary" | "tertiary";
  size: "none" | "sm" | "md" | "lg";
} & PropsWithChildren;

const Card: FC<Props> = ({ className, theme, size, children, ...props }) => {
  return (
    <div
      className={cn(
        "rounded-xl border transition-colors",
        theme === "primary" && "border-[#23252a] bg-gray-900",
        theme === "secondary" &&
          "border-[#23252a] bg-gray-800 shadow-[0px_4px_24px_rgba(0,0,0,0.2)]",
        theme === "tertiary" && "border-[#34343a] bg-transparent",
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
