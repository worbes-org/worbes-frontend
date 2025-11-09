import { cn } from "@/utils/styles";
import { Transition } from "@headlessui/react";
import { type FC, type PropsWithChildren } from "react";

type Props = {
  className?: string;
  isOpen: boolean;
  closeOnClick?: boolean;
  onClose?: () => void;
} & PropsWithChildren;

const DropdownPanel: FC<Props> = ({
  className,
  isOpen,
  closeOnClick,
  onClose,
  children,
}) => {
  return (
    <Transition
      className={cn(
        "absolute inset-x-0 z-10 mt-2 rounded-4xl border-2 border-green-900 bg-gray-950 px-4 py-3 transition duration-200 ease-out",
        "data-[closed]:pointer-events-none data-[closed]:translate-y-1 data-[closed]:opacity-0",
        className,
      )}
      show={isOpen}
      role="menu"
      as="section"
      onClick={closeOnClick ? onClose : undefined}
    >
      {children}
    </Transition>
  );
};

export default DropdownPanel;
