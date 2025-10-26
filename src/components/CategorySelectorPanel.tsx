"use client";

import ListSelector from "@/components/ListSelector";
import ScrollFade from "@/components/ScrollFade";
import { ITEM_CATEGORIES } from "@/constants/category";
import { useCategorySelection } from "@/hooks/useCategorySelection";
import type { CategorySelection, ItemCategory } from "@/types/category";
import type { Nullable } from "@/types/misc";
import type { ListSelectorOption } from "@/types/selector";
import { cn } from "@/utils/styles";
import { last } from "lodash-es";
import { useMemo, useRef, useState, type FC, type ReactNode } from "react";

type Props = {
  className?: string;
  listClassName?: string;
  renderButton?: (selection: Nullable<CategorySelection>) => ReactNode;
  onChange?: (event: CategorySelection) => void;
};

const CategorySelectorPanel: FC<Props> = ({
  className,
  listClassName,
  onChange,
  renderButton,
}) => {
  const options = useMemo(() => buildCategoryOptions(ITEM_CATEGORIES), []);
  const listRef = useRef<Nullable<HTMLUListElement>>(null);

  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [state, setState] = useCategorySelection();

  return (
    <div className={cn("relative", className)}>
      <>
        <ListSelector
          className={cn("", listClassName)}
          ref={listRef}
          options={options}
          selectedValues={selectedValues}
          onSelect={handleSelect}
        />
        <ScrollFade
          className="absolute inset-x-0 bottom-12"
          listContainerRef={listRef}
          direction="bottom"
        />
      </>

      {renderButton?.(state)}
    </div>
  );

  function handleSelect(
    option: ListSelectorOption<string, ItemCategory>,
    isOpen?: boolean,
  ) {
    const value = option.value;
    const keys = value.split(":");
    const parentKey = keys.slice(0, -1).join(":");

    const filtered = selectedValues.filter(
      (value) => !value.startsWith(parentKey),
    );

    const nextValues = [...filtered, parentKey, isOpen ? value : ""].filter(
      Boolean,
    );
    const nextState = {
      classId: option.metadata?.class,
      subClassId: option.metadata?.subClass,
      label: last(nextValues)?.split(":").join(" > "),
    };

    setSelectedValues(nextValues);
    setState(nextState);
    onChange?.(nextState);
  }

  function buildCategoryOptions(
    categories: ItemCategory[],
    parentValue?: string,
  ): ListSelectorOption<string, ItemCategory>[] {
    return categories.map((category) => {
      const value = parentValue
        ? `${parentValue}:${category.name}`
        : category.name;

      return {
        label: category.name,
        value,
        children: category.subcategories
          ? buildCategoryOptions(category.subcategories, value)
          : undefined,
        metadata: category,
      };
    });
  }
};

export default CategorySelectorPanel;
