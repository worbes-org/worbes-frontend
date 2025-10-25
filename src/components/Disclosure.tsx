"use client";

import { cn } from "@/utils/styles";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState, type FC, type PropsWithChildren } from "react";
import { useIsomorphicLayoutEffect } from "react-use";

type Props = {
  className?: string;
  title: React.ReactNode;
  isOpen?: boolean;
} & PropsWithChildren;

const Disclosure: FC<Props> = ({
  className,
  title,
  isOpen: _isOpen,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(!!_isOpen);

  useIsomorphicLayoutEffect(() => {
    setIsOpen(!!_isOpen);
  }, [_isOpen]);

  return (
    <div className={cn("overflow-hidden pt-2", className)}>
      <button
        className="flex w-full items-center justify-between text-left"
        onClick={handleToggle}
      >
        {title}
        <ChevronDownIcon
          className={cn(
            "size-6 text-green-200 transition-transform duration-300 ease-in-out",
            isOpen && "rotate-180",
          )}
        />
      </button>
      <div
        className={cn(
          "max-h-[2000px] pt-2 transition-all duration-200 ease-in-out",
          !isOpen && "pointer-events-none max-h-0 opacity-0",
        )}
      >
        {children}
      </div>
    </div>
  );

  function handleToggle() {
    setIsOpen((prev) => !prev);
  }
};

export default Disclosure;
