import { cn } from "@/utils/styles";
import { type FC, type PropsWithChildren } from "react";

type Props = {
  className?: string;
} & PropsWithChildren;

const BlockSection: FC<Props> = ({ className, children }) => {
  return (
    <section className={cn("rounded-4xl bg-green-900/50 p-6", className)}>
      {children}
    </section>
  );
};

export default BlockSection;
