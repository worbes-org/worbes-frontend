import Card from "@/components/Card";
import { cn } from "@/utils/styles";
import { Transition } from "@headlessui/react";
import { type FC, type PropsWithChildren } from "react";

type Props = {
  className?: string;
  isOpen: boolean;
  position?: "bottom-right" | "bottom-left" | "bottom";
  padding?: "none" | "sm" | "md" | "lg";
} & PropsWithChildren;

const DropdownPanel: FC<Props> = ({
  className,
  isOpen,
  position,
  padding = "none",
  children,
}) => {
  return (
    <Transition
      className={cn(
        "absolute transition duration-200 ease-out",
        "data-[closed]:pointer-events-none data-[closed]:opacity-0",
        position === "bottom-right" && "right-0 -bottom-1 translate-y-full",
        position === "bottom-left" && "-bottom-1 left-0 translate-y-full",
        position === "bottom" &&
          "inset-x-full -bottom-1 left-0 w-full translate-y-full",
        className,
      )}
      show={isOpen}
      as={Card}
      theme="primary"
      padding={padding}
    >
      {children}
    </Transition>
  );
};

export default DropdownPanel;
