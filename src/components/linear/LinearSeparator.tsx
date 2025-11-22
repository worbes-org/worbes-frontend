import { cn } from "@/utils/styles";
import { type ComponentProps, type FC } from "react";

type Props = {
  orientation?: "horizontal" | "vertical";
} & ComponentProps<"div">;

const LinearSeparator: FC<Props> = ({
  orientation = "horizontal",
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "bg-border-primary",
        orientation === "horizontal" && "h-px w-full",
        orientation === "vertical" && "h-full w-px",
        className,
      )}
      {...props}
    />
  );
};

export default LinearSeparator;
