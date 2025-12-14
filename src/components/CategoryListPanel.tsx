import NestedListSelector from "@/components/NestedListSelector";
import { ITEM_CATEGORIES } from "@/constants/category";
import { CategorySelection, ItemCategory } from "@/types/category";
import { Nullable } from "@/types/misc";
import { ListSelectorOption } from "@/types/selector";
import { GradientClassName } from "@/types/transition";
import {
  buildCategoryOptions,
  getCategorySelection,
  getSelectedValues,
  parseCategoryLabel,
} from "@/utils/selector";
import { cn } from "@/utils/styles";
import { FC, useEffect, useState } from "react";

type Props = {
  className?: string;
  listClassName?: string;
  fadeGradientClassName?: GradientClassName;
  value: Nullable<CategorySelection>;
  onChange?: (value: CategorySelection) => void;
};

const CategoryListPanel: FC<Props> = ({
  className,
  listClassName,
  fadeGradientClassName,
  value,
  onChange,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  useEffect(() => {
    const selectedValues = value?.label ? parseCategoryLabel(value.label) : [];
    setSelectedValues(selectedValues);
  }, [value]);

  return (
    <NestedListSelector
      className={cn("", className)}
      listClassName={cn("", listClassName)}
      fadeGradientClassName={fadeGradientClassName}
      options={buildCategoryOptions(ITEM_CATEGORIES)}
      selectedValues={selectedValues}
      onSelect={handleSelect}
    />
  );

  function handleSelect(
    option: ListSelectorOption<string, ItemCategory>,
    isOpen?: boolean,
  ) {
    const nextValues = getSelectedValues({
      values: selectedValues,
      option,
      isOpen,
    });
    const nextState = getCategorySelection({ values: nextValues, option });

    setSelectedValues(nextValues);
    onChange?.(nextState);
  }
};

export default CategoryListPanel;
