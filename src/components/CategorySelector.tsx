import ListSelector from "@/components/ListSelector";
import { ITEM_CATEGORIES } from "@/constants/category";
import {
  buildCategoryOptions,
  findClassCategory,
  findSubClassCategory,
} from "@/utils/category";
import { cn } from "@/utils/styles";
import { type FC, useMemo, useState } from "react";

type Props = {
  className?: string;
  onChange?: (classId?: number, subClassId?: number) => void;
};

const CategorySelector: FC<Props> = ({ className, onChange }) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const options = useMemo(() => buildCategoryOptions(ITEM_CATEGORIES), []);

  return (
    <ListSelector
      className={cn("", className)}
      options={options}
      selectedValues={selectedValues}
      onSelect={handleSelect}
    />
  );

  function handleSelect(value: string) {
    const keys = value.split(":");
    const parentKey = keys.slice(0, -1).join(":");

    const filtered = selectedValues.filter((key) => !key.startsWith(parentKey));
    const next = [...filtered, parentKey, value].filter(Boolean);

    setSelectedValues(next);
    handleChange(value);
  }

  function handleChange(value: string) {
    const names = value.split(":");
    const className = names[0];
    const subClassNames = names.slice(1);

    const classCategory = findClassCategory(ITEM_CATEGORIES, className);
    const subCategory = findSubClassCategory(classCategory, subClassNames);

    onChange?.(classCategory?.class, subCategory?.subClass);
  }
};

export default CategorySelector;
