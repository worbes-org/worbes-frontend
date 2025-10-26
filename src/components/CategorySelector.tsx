import Button from "@/components/Button";
import ListSelector from "@/components/ListSelector";
import ScrollFade from "@/components/ScrollFade";
import Translation from "@/components/Translation";
import { ITEM_CATEGORIES } from "@/constants/category";
import { useTranslations } from "@/hooks/useTranslations";
import type {
  ItemCategory,
  ItemChildCategory,
  ItemRootCategory,
} from "@/types/category";
import type { Nullable } from "@/types/misc";
import type { ListSelectorOption } from "@/types/selector";
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
  const t = useTranslations();
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
    const next = [...filtered, parentKey, isOpen ? value : ""].filter(Boolean);

    setSelectedValues(next);
    onChange?.(option.metadata?.class, option.metadata?.subClass);
  }

  function buildCategoryOptions(
    categories: ItemRootCategory[] | ItemChildCategory[],
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

export default CategorySelector;
