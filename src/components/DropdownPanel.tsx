import { cn } from "@/utils/styles";
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
    <section
      className={cn(
        "absolute inset-x-0 z-10 mt-2 rounded-4xl bg-gray-950 px-4 py-3 transition duration-200 ease-out",
        !isOpen && "pointer-events-none translate-y-1 opacity-0",
        className,
      )}
      ref={ref}
      role="menu"
      onClick={closeOnClick ? onClose : undefined}
    >
      {children}
    </section>
  );
};

export default DropdownPanel;
