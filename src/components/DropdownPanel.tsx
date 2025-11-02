import { cn } from "@/utils/styles";
import { Transition } from "@headlessui/react";
import { noop } from "lodash-es";
import { useRef, type FC, type PropsWithChildren } from "react";
import { useClickAway } from "react-use";

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
  const ref = useRef<HTMLDivElement>(null);

  useClickAway(ref, onClose ?? noop);

  return (
    <Transition
      className={cn(
        "absolute inset-x-0 z-10 mt-2 rounded-4xl bg-gray-950 px-4 py-3 transition duration-200 ease-out",
        "data-[closed]:pointer-events-none data-[closed]:translate-y-1 data-[closed]:opacity-0",
        className,
      )}
      show={isOpen}
      ref={ref}
      role="menu"
      as="section"
      onClick={closeOnClick ? onClose : undefined}
    >
      {children}
    </Transition>
  );
};

export default DropdownPanel;
