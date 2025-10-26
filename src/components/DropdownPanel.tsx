import { cn } from "@/utils/styles";
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
    <section
      className={cn(
        "absolute inset-x-0 z-10 mt-2 rounded-4xl bg-gray-950 px-4 py-3 transition duration-200 ease-out",
        !isOpen && "pointer-events-none translate-y-1 opacity-0",
        className,
      )}
      role="menu"
      onClick={closeOnClick ? onClose : undefined}
    >
      {children}
    </section>
  );
};

export default DropdownPanel;
