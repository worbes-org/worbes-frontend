import { cn } from "@/utils/styles";
import { PropsWithChildren, type FC } from "react";

type Props = {
  className?: string;
  theme: "primary" | "secondary" | "tertiary";
  padding: "none" | "sm" | "md" | "lg";
} & PropsWithChildren;

const Card: FC<Props> = ({ className, theme, padding, children, ...props }) => {
  return (
    <div
      className={cn(
        "rounded-xl border transition-colors",
        theme === "primary" && "border-[#23252a] bg-gray-900",
        theme === "secondary" &&
          "border-[#23252a] bg-gray-800 shadow-[0px_4px_24px_rgba(0,0,0,0.2)]",
        theme === "tertiary" && "border-[#34343a] bg-transparent",
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

export default Card;
