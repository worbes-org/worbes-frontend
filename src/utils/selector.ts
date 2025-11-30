import { ItemCategory } from "@/types/category";
import { ListSelectorOption } from "@/types/selector";
import { last } from "lodash-es";

export function buildCategoryOptions(
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

export function getSelectedValues(args: {
  values: string[];
  option: ListSelectorOption<string, ItemCategory>;
  isOpen?: boolean;
}) {
  const { values, option, isOpen } = args;

  const value = option.value;
  const keys = value.split(":");
  const parentKey = keys.slice(0, -1).join(":");

  const filtered = values.filter((value) => !value.startsWith(parentKey));
  const nextValues = [...filtered, parentKey, isOpen ? value : ""].filter(
    Boolean,
  );

  return nextValues;
}

export function getCategorySelection(args: {
  values: string[];
  option: ListSelectorOption<string, ItemCategory>;
}) {
  const { values, option } = args;

  return {
    classId: values.length > 0 ? option.metadata?.class : undefined,
    subClassId: values.length > 0 ? option.metadata?.subClass : undefined,
    label: last(values)?.split(":").join(" > "),
  };
}
