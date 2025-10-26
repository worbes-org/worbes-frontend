import Disclosure from "@/components/Disclosure";
import type { Nullable } from "@/types/misc";
import type { ListSelectorOption } from "@/types/selector";
import { cn } from "@/utils/styles";
import { CheckIcon } from "@heroicons/react/24/outline";
import { type FC, type RefObject } from "react";

type ListSelectorProps<TValue> = {
  className?: string;
  ref?: RefObject<Nullable<HTMLUListElement>>;
  options: ListSelectorOption<TValue>[];
  selectedValues: TValue[];
  onSelect: (value: TValue, isOpen?: boolean) => void;
};

const ListSelector = <TValue extends string | number>({
  className,
  ref,
  options,
  selectedValues,
  onSelect,
}: ListSelectorProps<TValue>) => {
  return (
    <ul className={cn("divide-y divide-gray-800", className)} ref={ref}>
      {options.map((option) => {
        const isSelected = selectedValues.includes(option.value);

        return (
          <li key={option.value}>
            {option.children ? (
              <Disclosure
                title={
                  <ListSelectorOption
                    label={option.label}
                    isSelected={isSelected}
                  />
                }
                isOpen={isSelected}
                onToggle={handleSelect(option.value)}
              >
                <ListSelector
                  className="pl-5"
                  options={option.children}
                  selectedValues={selectedValues}
                  onSelect={onSelect}
                />
              </Disclosure>
            ) : (
              <ListSelectorOption
                className="w-full py-2"
                label={option.label}
                isSelected={isSelected}
                onClick={handleSelect(option.value)}
              />
            )}
          </li>
        );
      })}
    </ul>
  );

  function handleSelect(value: TValue) {
    return (isOpen?: boolean) => onSelect(value, isOpen);
  }
};

type ListSelectorItemProps = {
  className?: string;
  label: string;
  isSelected: boolean;
  onClick?: () => void;
};

const ListSelectorOption: FC<ListSelectorItemProps> = ({
  className,
  label,
  isSelected,
  onClick,
}) => {
  return (
    <button
      className={cn("flex items-center gap-x-2 text-green-200", className)}
      onClick={onClick}
    >
      {isSelected && <CheckIcon className="size-4 stroke-3 text-green-300" />}
      {label}
    </button>
  );
};

export default ListSelector;
