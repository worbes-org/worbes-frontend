import ScrollFade from "@/components/ScrollFade";
import SelectorOption from "@/components/SelectorOption";
import { BaseListSelectorProps, ListSelectorOption } from "@/types/selector";
import { cn } from "@/utils/styles";
import { RefObject, useRef } from "react";

const FlatListSelector = <TValue extends string | number, TMetadata = unknown>({
  className,
  listClassName,
  fadeGradientClassName,
  options,
  selectedValues,
  onSelect,
  children,
}: BaseListSelectorProps<TValue, TMetadata>) => {
  const scrollAreaRef = useRef<HTMLElement>(null!);

  return (
    <div className={cn("relative", className)}>
      <ul
        className={cn("", listClassName)}
        ref={scrollAreaRef as RefObject<HTMLUListElement>}
      >
        {options.map((option) => {
          return (
            <li key={option.value}>
              <SelectorOption
                className="w-full px-4 py-2.5"
                label={option.label}
                isSelected={selectedValues.includes(option.value)}
                onClick={handleSelect(option)}
              />
            </li>
          );
        })}
      </ul>

      <ScrollFade
        gradientClassName={fadeGradientClassName}
        scrollAreaRef={scrollAreaRef}
        direction="bottom"
      />
      <ScrollFade
        gradientClassName={fadeGradientClassName}
        scrollAreaRef={scrollAreaRef}
        direction="top"
      />
    </div>
  );

  function handleSelect(option: ListSelectorOption<TValue, TMetadata>) {
    return () => onSelect(option);
  }
};

export default FlatListSelector;
