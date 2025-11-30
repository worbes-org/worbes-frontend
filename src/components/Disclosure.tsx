"use client";

import { cn } from "@/utils/styles";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  useState,
  type FC,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import { useIsomorphicLayoutEffect } from "react-use";

type Props = {
  className?: string;
  titleClassName?: string;
  title: ReactNode;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
} & PropsWithChildren;

const Disclosure: FC<Props> = ({
  className,
  titleClassName,
  title,
  isOpen: _isOpen,
  onToggle,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(!!_isOpen);

  useIsomorphicLayoutEffect(() => {
    setIsOpen(!!_isOpen);
  }, [_isOpen]);

  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-full items-center gap-x-2 py-2",
          isOpen && "bg-accent-600/10",
          !isOpen && "hover:bg-gray-700",
          titleClassName,
        )}
        role="button"
        onClick={handleToggle}
      >
        <ChevronDownIcon
          className={cn(
            "size-4 text-gray-300 transition-transform duration-500 ease-in-out",
            !isOpen && "-rotate-90",
          )}
        />
        <span
          className={cn("text-sm font-medium", isOpen && "text-accent-600")}
        >
          {title}
        </span>
        {isOpen && (
          <div className="ml-auto size-1.5 rounded-full bg-accent-600" />
        )}
      </div>
      <div
        className={cn(
          "max-h-[2000px] transition-all duration-300 ease-in-out",
          !isOpen && "pointer-events-none max-h-0 opacity-0",
        )}
      >
        {children}
      </div>
    </div>
  );

  function handleToggle() {
    const next = !isOpen;
    setIsOpen(next);
    onToggle?.(next);
  }
};

export default Disclosure;
