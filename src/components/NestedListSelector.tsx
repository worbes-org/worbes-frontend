import Disclosure from "@/components/Disclosure";
import ScrollFade from "@/components/ScrollFade";
import SelectorOption from "@/components/SelectorOption";
import { BaseListSelectorProps, ListSelectorOption } from "@/types/selector";
import { cn } from "@/utils/styles";
import { RefObject, useRef } from "react";

type Props<TValue, TMetadata = unknown> = {
  _depth?: number;
} & BaseListSelectorProps<TValue, TMetadata>;

const NestedListSelector = <
  TValue extends string | number,
  TMetadata = unknown,
>({
  className,
  listClassName,
  fadeGradientClassName,
  options,
  selectedValues,
  _depth = 0,
  onSelect,
  children,
}: Props<TValue, TMetadata>) => {
  const scrollAreaRef = useRef<HTMLElement>(null!);

  return (
    <div className={cn("", className)}>
      <div className="relative">
        <ul
          className={cn("divide-y divide-[#23252a]", listClassName)}
          ref={scrollAreaRef as RefObject<HTMLUListElement>}
        >
          {options.map((option) => {
            const isSelected = selectedValues.includes(option.value);

            return (
              <li key={option.value}>
                {option.children ? (
                  <Disclosure
                    titleClassName={cn("pr-4", getLeftPadding(_depth))}
                    title={<SelectorOption label={option.label} />}
                    isOpen={isSelected}
                    onToggle={handleSelect(option)}
                  >
                    <NestedListSelector
                      options={option.children}
                      selectedValues={selectedValues}
                      _depth={_depth + 1}
                      onSelect={onSelect}
                    />
                  </Disclosure>
                ) : (
                  <SelectorOption
                    className={cn("w-full py-2.5 pr-4", getLeftPadding(_depth))}
                    label={option.label}
                    isSelected={isSelected}
                    onClick={handleSelect(option)}
                  />
                )}
              </li>
            );
          })}
        </ul>
        <ScrollFade
          gradientClassName={fadeGradientClassName}
          scrollAreaRef={scrollAreaRef}
          direction="bottom"
          disabled={_depth > 0}
        />
        <ScrollFade
          gradientClassName={fadeGradientClassName}
          scrollAreaRef={scrollAreaRef}
          direction="top"
          disabled={_depth > 0}
        />
      </div>

      {children}
    </div>
  );

  function handleSelect(option: ListSelectorOption<TValue, TMetadata>) {
    return (isOpen?: boolean) => onSelect(option, isOpen);
  }

  function getLeftPadding(depth: number) {
    switch (depth) {
      case 0:
        return "pl-4";
      case 1:
        return "pl-10";
      case 2:
        return "pl-16";
      case 3:
        return "pl-22";
      default:
        return "pl-4";
    }
  }
};

export default NestedListSelector;
