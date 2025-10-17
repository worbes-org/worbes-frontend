import { cn } from "@/utils/styles";
import { type FC, type PropsWithChildren } from "react";

type Props = {
  className?: string;
} & PropsWithChildren;

const LayoutContainer: FC<Props> = ({ className, children }) => {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4 md:px-6", className)}>
      {children}
    </div>
  );
};

export default LayoutContainer;
