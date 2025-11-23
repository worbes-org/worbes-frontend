import Disclosure from "@/components/Disclosure";
import Text from "@/components/Text";
import type { Nullable } from "@/types/misc";
import type { ListSelectorOption } from "@/types/selector";
import { cn } from "@/utils/styles";
import { type FC, type RefObject } from "react";

type Props<TValue, TMetadata = unknown> = {
  className?: string;
  ref?: RefObject<Nullable<HTMLUListElement>>;
  options: ListSelectorOption<TValue, TMetadata>[];
  selectedValues: Nullable<TValue>[];
  _depth?: number;
  onSelect: (
    option: ListSelectorOption<TValue, TMetadata>,
    isOpen?: boolean,
  ) => void;
};

const ListSelector = <TValue extends string | number, TMetadata = unknown>({
  className,
  ref,
  options,
  selectedValues,
  _depth = 0,
  onSelect,
}: Props<TValue, TMetadata>) => {
  return (
    <ul
      className={cn("space-y-0.5 divide-y divide-[#23252a]", className)}
      ref={ref}
    >
      {options.map((option) => {
        const isSelected = selectedValues.includes(option.value);

        return (
          <li key={option.value}>
            {option.children ? (
              <Disclosure
                titleClassName={cn(
                  getLeftPadding(_depth),
                  isSelected && "bg-gray-800",
                )}
                title={
                  <ListSelectorOption
                    label={option.label}
                    isSelected={isSelected}
                  />
                }
                isOpen={isSelected}
                onToggle={handleSelect(option)}
              >
                <ListSelector
                  options={option.children}
                  selectedValues={selectedValues}
                  _depth={_depth + 1}
                  onSelect={onSelect}
                />
              </Disclosure>
            ) : (
              <ListSelectorOption
                className={cn("w-full py-2", getLeftPadding(_depth))}
                label={option.label}
                isSelected={isSelected}
                onClick={handleSelect(option)}
              />
            )}
          </li>
        );
      })}
    </ul>
  );

  function handleSelect(option: ListSelectorOption<TValue, TMetadata>) {
    return (isOpen?: boolean) => onSelect(option, isOpen);
  }

  function getLeftPadding(depth: number) {
    switch (depth) {
      case 0:
        return "pl-2";
      case 1:
        return "pl-8";
      case 2:
        return "pl-14";
      case 3:
        return "pl-20";
      default:
        return "pl-2";
    }
  }
};

type ListSelectorItemProps = {
  className?: string;
  label: string;
  isSelected: boolean;
  Icon?: FC<{ className?: string }>;
  onClick?: () => void;
};

const ListSelectorOption: FC<ListSelectorItemProps> = ({
  className,
  label,
  isSelected,
  Icon,
  onClick,
}) => {
  return (
    <button
      className={cn("flex items-center gap-x-2", className)}
      onClick={onClick}
    >
      <Text theme={isSelected ? "primary" : "secondary"} size="sm">
        {Icon && <Icon className="size-4 text-current" />}
        {label}
      </Text>
    </button>
  );
};

export default ListSelector;
