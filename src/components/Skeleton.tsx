import { cn } from "@/utils/styles";
import { type FC, type PropsWithChildren } from "react";

type Props = {
  className?: string;
} & PropsWithChildren;

const Skeleton: FC<Props> = ({ className, children }) => {
  return (
    <div
      className={cn(
        "relative size-fit animate-[pulse_3s_ease-in-out_infinite] cursor-progress overflow-clip rounded-3xl bg-gray-500/10",
        className,
      )}
      role="status"
    >
      <div
        className={cn(
          "absolute inset-0 animate-[slide_4.5s_infinite]",
          "before:absolute before:right-0 before:h-full before:w-18 before:scale-y-150 before:rotate-30 before:bg-gray-500/15 before:blur-md",
        )}
      />
      {children}
    </div>
  );
};

export default Skeleton;
