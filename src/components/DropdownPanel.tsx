import Card from "@/components/Card";
import { cn } from "@/utils/styles";
import { Transition } from "@headlessui/react";
import { type FC, type PropsWithChildren } from "react";

type Props = {
  className?: string;
  isOpen: boolean;
} & PropsWithChildren;

const DropdownPanel: FC<Props> = ({ className, isOpen, children }) => {
  return (
    <Transition
      className={cn(
        "absolute inset-x-0 z-10 mt-2 overflow-hidden transition duration-200 ease-out",
        "data-[closed]:pointer-events-none data-[closed]:translate-y-1 data-[closed]:opacity-0",
        className,
      )}
      show={isOpen}
      as={Card}
      theme="secondary"
      padding="none"
    >
      {children}
    </Transition>
  );
};

export default DropdownPanel;
