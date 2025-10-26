import Button from "@/components/Button";
import ListSelector from "@/components/ListSelector";
import ScrollFade from "@/components/ScrollFade";
import Translation from "@/components/Translation";
import { ITEM_CATEGORIES } from "@/constants/category";
import type { Nullable } from "@/types/misc";
import {
  buildCategoryOptions,
  findClassCategory,
  findSubClassCategory,
} from "@/utils/category";
import { cn } from "@/utils/styles";
import { last, noop } from "lodash-es";
import { type FC, useMemo, useRef, useState } from "react";

type Props = {
  className?: string;
  listClassName?: string;
  onChange?: (classId?: number, subClassId?: number) => void;
};

const CategorySelector: FC<Props> = ({
  className,
  listClassName,
  onChange,
}) => {
  const options = useMemo(() => buildCategoryOptions(ITEM_CATEGORIES), []);
  const listRef = useRef<Nullable<HTMLUListElement>>(null);

  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const selectedLabel = last(selectedValues)?.split(":").join(" > ");

  return (
    <div className={cn("relative", className)}>
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

      <Button className="w-full" theme="primary" size="md" onClick={noop}>
        {selectedLabel ? selectedLabel : <Translation messageKey="Close" />}
      </Button>
    </div>
  );

  function handleSelect(value: string, isOpen?: boolean) {
    const keys = value.split(":");
    const parentKey = keys.slice(0, -1).join(":");

    const filtered = selectedValues.filter(
      (value) => !value.startsWith(parentKey),
    );
    const next = [...filtered, parentKey, isOpen ? value : ""].filter(Boolean);

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
