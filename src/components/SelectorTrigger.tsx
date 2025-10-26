import Input from "@/components/Input";
import type { Optional } from "@/types/misc";
import { cn } from "@/utils/styles";
import { useState, type ComponentProps, type FC, type ReactNode } from "react";

type Props = {
  className?: string;
  placeholder: string;
  children?:
    | ReactNode
    | ((props: {
        isOpen: boolean;
        onClose: () => void;
        setLabel: (label: Optional<string>) => void;
      }) => ReactNode);
} & Pick<
  ComponentProps<typeof Input>,
  "LeftIcon" | "RightIcon" | "theme" | "size"
>;

const SelectorTrigger: FC<Props> = ({
  className,
  placeholder,
  children,
  ...props
}) => {
  const [label, setLabel] = useState<Optional<string>>(placeholder);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div
        className={cn("", className)}
        role="button"
        onClick={handleToggle(true)}
      >
        <Input
          className="pointer-events-none"
          value={label === placeholder ? "" : label}
          placeholder={placeholder}
          {...props}
        />
      </div>

      {typeof children === "function"
        ? children({ isOpen, onClose: handleToggle(false), setLabel })
        : children}
    </div>
  );

  function handleToggle(visible: boolean) {
    return () => setIsOpen(visible);
  }
};

export default SelectorTrigger;
