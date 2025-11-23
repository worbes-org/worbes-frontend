import { GradientClassName } from "@/types/transition";
import { cn } from "@/utils/styles";
import { useEffect, useState, type FC, type RefObject } from "react";
import { useScroll } from "react-use";

type Props = {
  className?: string;
  gradientClassName?: GradientClassName;
  scrollAreaRef: RefObject<HTMLElement>;
  direction: "top" | "bottom";
  disabled?: boolean;
};

const ScrollFade: FC<Props> = ({
  className,
  gradientClassName = { from: "from-transparent", to: "to-gray-950/50" },
  scrollAreaRef,
  direction,
  disabled,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const { y } = useScroll(scrollAreaRef);

  useEffect(() => {
    const element = scrollAreaRef.current;
    if (!element) {
      return;
    }

    if (direction === "bottom") {
      setIsVisible(y >= element.scrollHeight - element.clientHeight - 10);
      return;
    }

    setIsVisible(y <= 10);
  }, [y, scrollAreaRef.current, direction]);

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 h-7 transition-opacity duration-700",
        direction === "bottom" && "bottom-0 bg-gradient-to-b",
        direction === "top" && "top-0 bg-gradient-to-t",
        (isVisible || disabled) && "opacity-0",
        gradientClassName.from,
        gradientClassName.to,
        className,
      )}
    />
  );
};

export default ScrollFade;
