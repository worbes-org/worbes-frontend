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
  contentClassName?: string;
  title: ReactNode;
  visible: Optional<boolean>;
  onClose: () => void;
};

const FullscreenModal: FC<PropsWithChildren<Props>> = ({
  contentClassName,
  title,
  visible,
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

      <div className="fixed inset-0 z-50 h-dvh w-screen p-4">
        <DialogPanel
          className={cn(
            "duration-300 data-[closed]:translate-y-3 data-[closed]:opacity-0",
            "shadow-brand h-full w-full space-y-8 rounded-3xl border border-gray-600 bg-gray-900 p-4 text-left",
          )}
          transition
        >
          <div className="relative">
            <DialogTitle className="font-brand text-lg text-green-300" as="h2">
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

          <div
            className={cn(
              "[--content-height-offset:7.75rem]",
              "scrollbar-hide h-[calc(100dvh-var(--content-height-offset))] overflow-y-auto",
              contentClassName,
            )}
          >
            {children}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default FullscreenModal;
