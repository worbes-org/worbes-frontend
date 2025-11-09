import Input from "@/components/Input";
import type { Optional } from "@/types/misc";
import { cn } from "@/utils/styles";
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
  "LeftIcon" | "RightIcon" | "theme" | "size" | "isLoading"
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
