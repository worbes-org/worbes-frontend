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
import { type FC, type PropsWithChildren, type ReactNode } from "react";

type Props = {
  title: ReactNode;
  visible: Optional<boolean>;
  size: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  onClose: () => void;
};

const Modal: FC<PropsWithChildren<Props>> = ({
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
              "shadow-brand relative w-full rounded-3xl border border-gray-600 bg-gray-900 p-4 text-left transition-transform",
              size === "sm" && "max-w-[328px]",
              size === "md" && "max-w-[468px]",
              size === "lg" && "max-w-[800px]",
              size === "xl" && "max-w-[1280px]",
              size === "2xl" && "max-w-[1600px]",
              size === "3xl" && "max-w-[1920px]",
            )}
            transition
          >
            <div className="relative">
              <DialogTitle
                className="font-brand text-lg text-accent-700"
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
