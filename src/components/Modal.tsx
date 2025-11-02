import IconButton from "@/components/IconButton";
import type { Optional } from "@/types/misc";
import { cn } from "@/utils/styles";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { type PropsWithChildren, type ReactNode } from "react";

type Props = {
  title: ReactNode;
  visible: Optional<boolean>;
  size: "sm" | "md";
  onClose: () => void;
};

const Modal: React.FC<PropsWithChildren<Props>> = ({
  title,
  visible,
  size,
  onClose,
  children,
}) => {
  return (
    <Dialog open={visible} onClose={onClose}>
      <DialogBackdrop
        className={cn(
          "duration-300 data-[closed]:opacity-0",
          "fixed inset-0 bg-black/50 transition-opacity",
          "z-50",
        )}
        transition
      />

      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            className={cn(
              "duration-300 data-[closed]:scale-95 data-[closed]:opacity-0",
              "shadow-brand relative w-full rounded-3xl border border-blue-500/25 bg-green-950/90 p-4 text-left transition-transform",
              size === "sm" && "max-w-[328px]",
              size === "md" && "max-w-[468px]",
            )}
            transition
          >
            <div className="relative">
              <DialogTitle
                className="font-brand text-lg text-green-300"
                as="h2"
              >
                {title}
              </DialogTitle>

              <IconButton
                className="absolute -top-1 right-0"
                Icon={XMarkIcon}
                theme="secondary"
                size="md"
                type="button"
                onClick={onClose}
              />
            </div>

            <div className="mt-8">{children}</div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
