import Input from "@/components/Input";
import type { Optional } from "@/types/misc";
import { cn } from "@/utils/styles";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { noop } from "lodash-es";
import {
  useRef,
  useState,
  type ComponentProps,
  type FC,
  type ReactNode,
} from "react";
import { useClickAway, useKeyPressEvent } from "react-use";

type Props = {
  className?: string;
  label: Optional<string>;
  placeholder: Optional<string>;
  closeOnClickAway?: boolean;
  children?:
    | ReactNode
    | ((props: { isOpen: boolean; onClose: () => void }) => ReactNode);
} & Pick<
  ComponentProps<typeof Input>,
  "leftIcon" | "rightIcon" | "size" | "isLoading"
>;

const SelectorTrigger: FC<Props> = ({
  className,
  label,
  placeholder,
  closeOnClickAway = true,
  children,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  useKeyPressEvent("Escape", handleToggle(false));
  useClickAway(ref, closeOnClickAway ? handleToggle(false) : noop);

  return (
    <div className={cn("relative", className)} ref={ref}>
      <div role="button" onClick={handleToggle(!isOpen)}>
        <Input
          className="pointer-events-none"
          value={label ?? ""}
          placeholder={placeholder}
          rightIcon={
            <ChevronDownIcon
              className={cn(
                "transition-transform duration-200",
                isOpen && "rotate-180",
              )}
            />
          }
          onChange={noop} // HACK: Suppress uncontrolled input warning
          {...props}
        />
      </div>

      {typeof children === "function"
        ? children({ isOpen, onClose: handleToggle(false) })
        : children}
    </div>
  );

  function handleToggle(visible: boolean) {
    return () => setIsOpen(visible);
  }
};

export default SelectorTrigger;
