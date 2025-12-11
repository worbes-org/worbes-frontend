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
import { isFunction } from "lodash-es";
import {
  useId,
  useRef,
  type FC,
  type PointerEvent,
  type ReactNode,
} from "react";
import { useKeyPressEvent } from "react-use";

type Props = {
  className?: string;
  title: ReactNode;
  theme: "primary" | "secondary";
  isOpen: boolean;
  onClose: () => void;
  children:
    | ReactNode
    | ((props: { isOpen: boolean; onClose: () => void }) => ReactNode);
};

const BottomDrawer: FC<Props> = ({ className, isOpen, onClose, ...props }) => {
  useKeyPressEvent("Escape", onClose);

  return (
    <Portal>
      <AnimatePresence>
        {isOpen && (
          <div className="relative z-50">
            <DrawerOverlay visible={isOpen} onClose={onClose} />

            <DrawerPanel
              className={className}
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

type DrawerPanelProps = Props;

const DrawerPanel: FC<DrawerPanelProps> = ({
  className,
  title,
  theme,
  isOpen,
  onClose,
  children,
}) => {
  const id = useId();
  const drawerRef = useRef<HTMLDivElement>(null);
  const controls = useDragControls();

  return (
    <motion.aside
      className={cn(
        "fixed inset-x-0 bottom-0 w-full shadow-2xl",
        theme === "primary" && "px-4 pb-6",
        theme === "secondary" &&
          "after:absolute after:bottom-0 after:-mx-5 after:h-[100vh] after:w-full after:translate-y-full after:bg-inherit",
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
      animate={isOpen ? "visible" : "hidden"}
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
      <div
        className={cn(
          "relative h-full space-y-4 bg-gray-900 px-4 pb-4",
          theme === "primary" && "rounded-4xl",
          theme === "secondary" && "rounded-t-2xl pt-4",
        )}
      >
        <section>
          {theme === "primary" && (
            <div
              className="-mx-4 touch-none py-3.5"
              aria-label="drawer handle bar"
              onPointerDown={handleDragStart}
            >
              <div className="mx-auto h-1 w-12 rounded-full bg-gray-600" />
            </div>
          )}

          {title && (
            <div className="text-xl font-semibold text-green-400">{title}</div>
          )}

          {theme === "secondary" && (
            <IconButton
              className={cn(
                "absolute top-1 rounded-full text-gray-300",
                theme === "secondary" && "right-1",
              )}
              theme="clear"
              size="md"
              Icon={XMarkIcon}
              onClick={onClose}
            />
          )}
        </section>

        <section>
          {isFunction(children)
            ? children({ isOpen: isOpen, onClose })
            : children}
        </section>
      </div>
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
