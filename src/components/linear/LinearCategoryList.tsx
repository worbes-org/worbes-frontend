"use client";

import { ITEM_CATEGORIES } from "@/constants/category";
import type { CategorySelection, ItemCategory } from "@/types/category";
import type { Nullable } from "@/types/misc";
import type { ListSelectorOption } from "@/types/selector";
import { cn } from "@/utils/styles";
import { ChevronRightIcon, CheckIcon } from "@heroicons/react/24/outline";
import { last } from "lodash-es";
import { useMemo, useState, type FC, type ReactNode } from "react";

type Props = {
  className?: string;
  listClassName?: string;
  value: Nullable<CategorySelection>;
  renderButton?: (selection: Nullable<CategorySelection>) => ReactNode;
  onChange?: (event: CategorySelection) => void;
};

const LinearCategoryList: FC<Props> = ({
  className,
  listClassName,
  value,
  onChange,
  renderButton,
}) => {
  const options = useMemo(() => buildCategoryOptions(ITEM_CATEGORIES), []);

  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  return (
    <div className={cn("relative", className)}>
      <ul
        className={cn(
          "space-y-0.5 divide-y divide-[var(--linear-border-primary)]",
          listClassName,
        )}
      >
        {options.map((option) => (
          <LinearCategoryItem
            key={option.value}
            option={option}
            selectedValues={selectedValues}
            onSelect={handleSelect}
            level={0}
          />
        ))}
      </ul>

      {renderButton?.(value)}
    </div>
  );

  function handleSelect(
    option: ListSelectorOption<string, ItemCategory>,
    isOpen?: boolean,
  ) {
    const optionValue = option.value;
    const keys = optionValue.split(":");
    const parentKey = keys.slice(0, -1).join(":");

    const filtered = selectedValues.filter(
      (value) => !value.startsWith(parentKey),
    );

    const nextValues = [...filtered, parentKey, isOpen ? optionValue : ""].filter(
      Boolean,
    );
    const nextState: CategorySelection = {
      classId: option.metadata?.class,
      subClassId: option.metadata?.subClass,
      label: last(nextValues)?.split(":").join(" > "),
    };

    setSelectedValues(nextValues);
    onChange?.(nextState);
  }

  function buildCategoryOptions(
    categories: ItemCategory[],
    parentValue?: string,
  ): ListSelectorOption<string, ItemCategory>[] {
    return categories.map((category) => {
      const optionValue = parentValue
        ? `${parentValue}:${category.name}`
        : category.name;

      return {
        label: category.name,
        value: optionValue,
        children: category.subcategories
          ? buildCategoryOptions(category.subcategories, optionValue)
          : undefined,
        metadata: category,
      };
    });
  }
};

type LinearCategoryItemProps = {
  option: ListSelectorOption<string, ItemCategory>;
  selectedValues: string[];
  onSelect: (
    option: ListSelectorOption<string, ItemCategory>,
    isOpen?: boolean,
  ) => void;
  level: number;
};

const LinearCategoryItem: FC<LinearCategoryItemProps> = ({
  option,
  selectedValues,
  onSelect,
  level,
}) => {
  const isSelected = selectedValues.includes(option.value);
  const hasChildren = !!option.children && option.children.length > 0;
  const [isOpen, setIsOpen] = useState(isSelected);

  const handleToggle = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
      onSelect(option, !isOpen);
    } else {
      onSelect(option, false);
    }
  };

  return (
    <li>
      <button
        className={cn(
          "flex w-full items-center gap-2 px-3 py-2 text-left transition-colors",
          "hover:bg-[var(--linear-bg-translucent)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--linear-focus-ring-color)] focus-visible:ring-offset-2",
          level > 0 && "pl-6",
          isSelected && "bg-[var(--linear-bg-level2)]",
        )}
        onClick={handleToggle}
        style={{ paddingLeft: `${12 + level * 16}px` }}
      >
        {hasChildren && (
          <ChevronRightIcon
            className={cn(
              "size-4 shrink-0 text-[var(--linear-text-tertiary)] transition-transform",
              isOpen && "rotate-90",
            )}
          />
        )}
        {!hasChildren && isSelected && (
          <CheckIcon className="size-4 shrink-0 text-[var(--linear-focus-ring-color)]" />
        )}
        {!hasChildren && !isSelected && (
          <div className="size-4 shrink-0" />
        )}
        <span
          className={cn(
            "flex-1 text-sm",
            isSelected
              ? "text-[var(--linear-text-primary)] font-medium"
              : "text-[var(--linear-text-secondary)]",
          )}
        >
          {option.label}
        </span>
      </button>
      {hasChildren && isOpen && (
        <ul className="divide-y divide-[var(--linear-border-primary)]">
          {option.children?.map((childOption) => (
            <LinearCategoryItem
              key={childOption.value}
              option={childOption}
              selectedValues={selectedValues}
              onSelect={onSelect}
              level={level + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default LinearCategoryList;

