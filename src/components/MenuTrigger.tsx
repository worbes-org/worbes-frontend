import { cn } from "@/utils/styles";
import { noop } from "lodash-es";
import { FC, ReactNode, useRef, useState } from "react";
import { useClickAway, useKeyPressEvent } from "react-use";

type RenderButtonProps = {
  isOpen: boolean;
  onClick: () => void;
};

type RenderMenuProps = {
  isOpen: boolean;
};

type Props = {
  className?: string;
  closeOnClickAway?: boolean;
  menu?: {
    position: "bottom-left" | "bottom-right";
  };
  renderButton: (props: RenderButtonProps) => ReactNode;
  renderMenu: (props: RenderMenuProps) => ReactNode;
};

const MenuTrigger: FC<Props> = ({
  className,
  closeOnClickAway = true,
  menu,
  renderButton,
  renderMenu,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useKeyPressEvent("Escape", handleToggle(false));
  useClickAway(ref, closeOnClickAway ? handleToggle(false) : noop);

  return (
    <div className={cn("relative", className)} ref={ref}>
      {renderButton({ isOpen, onClick: handleToggle(!isOpen) })}
      {renderMenu({ isOpen })}
    </div>
  );

  function handleToggle(visible: boolean) {
    return () => setIsOpen(visible);
  }
};

export default MenuTrigger;
