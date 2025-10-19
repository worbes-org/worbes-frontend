import IconButton from "@/components/IconButton";
import { assert } from "@/utils/assert";
import { cn } from "@/utils/styles";
import { Portal } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  animate,
  AnimatePresence,
  motion,
  useDragControls,
} from "framer-motion";
import {
  useId,
  useRef,
  type FC,
  type PointerEvent,
  type PropsWithChildren,
} from "react";
import { useKeyPressEvent } from "react-use";

type Props = {
  className?: string;
  panelClassName?: string;
  overlayClassName?: string;
  isOpen: boolean;
  title?: string;
  theme?: "primary" | "secondary";
  hideCloseButton?: boolean;
  onClose: () => void;
};

const BottomDrawer: FC<PropsWithChildren<Props>> = ({
  className,
  panelClassName,
  overlayClassName,
  isOpen,
  onClose,
  ...props
}) => {
  useKeyPressEvent("Escape", onClose);

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <div className={cn("relative z-50", className)}>
            <DrawerOverlay
              className={overlayClassName}
              visible={isOpen}
              onClose={onClose}
            />

            <DrawerPanel
              className={panelClassName}
              isOpen={isOpen}
              onClose={onClose}
              {...props}
            />
          </div>
        )}
      </AnimatePresence>
    </Portal>
  );
};

const DrawerPanel: FC<Omit<PropsWithChildren<Props>, "overlayClassName">> = ({
  className,
  isOpen: visible,
  title,
  hideCloseButton,
  theme = "primary",
  onClose,
  children,
}) => {
  const id = useId();
  const drawerRef = useRef<HTMLDivElement>(null);
  const controls = useDragControls();

  return (
    <motion.aside
      className={cn(
        "fixed bottom-0 left-0 w-full space-y-6 bg-gray-950 px-5 shadow-[0px_0px_16px_0px_#111111CC]",
        "after:absolute after:bottom-0 after:-mx-5 after:h-[100vh] after:w-full after:translate-y-full after:bg-inherit",
        theme === "primary" && "rounded-t-3xl pb-12",
        className,
      )}
      key={`bottom-sheet-${id}`}
      ref={drawerRef}
      transition={{
        ease: "easeInOut",
        duration: 0.3,
      }}
      variants={{
        visible: {
          translateY: "0%",
        },
        hidden: {
          translateY: "100%",
        },
      }}
      initial="hidden"
      exit="hidden"
      animate={visible ? "visible" : "hidden"}
      drag="y"
      dragElastic={0.4}
      dragControls={controls}
      dragListener={false}
      dragConstraints={{ top: 0 }}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 30 }}
      onDragEnd={(_, info) => {
        assert(drawerRef.current, "drawerRef is not set");

        const CLOSE_THRESHOLD = 60;
        const shouldClose = info.offset.y > CLOSE_THRESHOLD;
        if (shouldClose) {
          onClose();
          return;
        }

        animate(drawerRef.current, {
          y: 0,
        });
      }}
    >
      <section>
        {theme === "primary" && (
          <div
            className="-mx-5 touch-none py-3"
            aria-label="drawer handle bar"
            onPointerDown={handleDragStart}
          >
            <div className="mx-auto h-1 w-8 rounded-full bg-gray-600" />
          </div>
        )}

        <div className={cn("relative h-6", theme === "secondary" && "mt-3")}>
          {title && (
            <div className="text-xl leading-6 font-semibold">{title}</div>
          )}
          {!hideCloseButton && (
            <IconButton
              className={cn(
                "absolute -top-1 rounded-full p-1 text-gray-300",
                theme === "primary" && "right-0",
                theme === "secondary" && "-right-4",
              )}
              theme="clear"
              size="md"
              Icon={XMarkIcon}
              onClick={onClose}
            />
          )}
        </div>
      </section>

      <section>{children}</section>
    </motion.aside>
  );

  function handleDragStart(event: PointerEvent<HTMLDivElement>) {
    controls.start(event);
  }
};

const DrawerOverlay: FC<{
  className?: string;
  visible: boolean;
  onClose: () => void;
}> = ({ className, visible, onClose }) => {
  const id = useId();

  return (
    <motion.div
      className={cn(
        "fixed inset-0 bg-black/50",
        !visible && "pointer-events-none",
        className,
      )}
      key={`bottom-sheet-overlay-${id}`}
      transition={{
        ease: "easeInOut",
        duration: 0.3,
      }}
      animate={visible ? "visible" : "hidden"}
      variants={{
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
      }}
      initial="hidden"
      exit="hidden"
      onClick={onClose}
    />
  );
};

export default BottomDrawer;
