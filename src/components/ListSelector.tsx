import Disclosure from "@/components/Disclosure";
import type { ListSelectorOption } from "@/types/selector";
import { cn } from "@/utils/styles";
import { CheckIcon } from "@heroicons/react/24/outline";
import { type FC } from "react";

type ListSelectorProps<TValue> = {
  className?: string;
  options: ListSelectorOption<TValue>[];
  selectedValues: TValue[];
  onSelect: (value: TValue) => void;
};

const ListSelector = <TValue extends string | number>({
  className,
  options,
  selectedValues,
  onSelect,
}: ListSelectorProps<TValue>) => {
  return (
    <div className={cn("divide-y divide-gray-800", className)}>
      {options.map((option) => {
        const isSelected = selectedValues.includes(option.value);

        return (
          <section key={option.value}>
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
          </section>
        );
      })}
    </div>
  );

  function handleSelect(value: TValue) {
    return () => onSelect(value);
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
