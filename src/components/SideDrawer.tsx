import { type Maybe } from "@/types/misc";
import { cn } from "@/utils/styles";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { isFunction } from "lodash-es";
import { type FC, type ReactNode } from "react";

type Props = {
  className?: string;
  isOpen: Maybe<boolean>;
  position: "left" | "right";
  onClose: () => void;
  children:
    | ReactNode
    | ((props: { isOpen: boolean; onClose: () => void }) => ReactNode);
};

const SideDrawer: FC<Props> = ({
  className,
  isOpen: _isOpen,
  position,
  onClose,
  children,
}) => {
  const isOpen = !!_isOpen;

  return (
    <Dialog
      className={cn("relative z-30", className)}
      open={!!isOpen}
      unmount={false}
      onClose={onClose}
    >
      <DialogBackdrop
        className={cn(
          "fixed inset-0 bg-black/50",
          "data-[closed]:opacity-0",
          "data-[enter]:duration-300 data-[enter]:ease-out",
          "data-[leave]:duration-200 data-[leave]:ease-in",
        )}
        as="div"
        transition
      />

      <DialogPanel
        className={cn(
          "fixed inset-y-0 duration-200 ease-out",
          position === "left" && "left-0 data-[closed]:-translate-x-full",
          position === "right" && "right-0 data-[closed]:translate-x-full",
          className,
        )}
        transition
      >
        {isFunction(children) ? children({ isOpen, onClose }) : children}
      </DialogPanel>
    </Dialog>
  );
};

export default SideDrawer;
