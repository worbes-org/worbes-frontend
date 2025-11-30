import { cn } from "@/utils/styles";
import { type ComponentProps, type FC } from "react";

type Props = {
  orientation: "horizontal" | "vertical";
} & ComponentProps<"div">;

const Separator: FC<Props> = ({ className, orientation, ...props }) => {
  return (
    <div
      className={cn(
        "bg-gray-500",
        orientation === "horizontal" && "h-px w-full",
        orientation === "vertical" && "h-full w-px",
        className,
      )}
      {...props}
    />
  );
};

export default Separator;
