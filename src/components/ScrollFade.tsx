import type { Nullable } from "@/types/misc";
import { cn } from "@/utils/styles";
import { useEffect, useState, type FC, type RefObject } from "react";
import { useScroll } from "react-use";

type Props = {
  className?: string;
  listContainerRef: RefObject<Nullable<HTMLUListElement>>;
  direction: "top" | "bottom";
};

const ScrollFade: FC<Props> = ({ className, listContainerRef, direction }) => {
  const [isVisible, setIsVisible] = useState(true);

  const { y } = useScroll(listContainerRef as RefObject<HTMLUListElement>);

  useEffect(() => {
    const element = listContainerRef.current;
    if (!element) {
      return;
    }

    if (direction === "bottom") {
      setIsVisible(y >= element.scrollHeight - element.clientHeight - 10);
      return;
    }

    setIsVisible(y <= 10);
  }, [y, listContainerRef, direction]);

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 h-6 from-transparent to-gray-950 transition-opacity duration-100",
        direction === "bottom" && "bottom-0 bg-gradient-to-b",
        direction === "top" && "top-0 bg-gradient-to-t",
        isVisible && "opacity-0",
        className,
      )}
    />
  );
};

export default ScrollFade;
