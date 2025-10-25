import type { ItemCategory, ItemSubCategory } from "@/types/category";
import type { Nullable } from "@/types/misc";
import type { ListSelectorOption } from "@/types/selector";

export function findClassCategory(
  categories: ItemCategory[],
  className: string,
) {
  const classCategory = categories.find(
    (category) => category.name === className,
  );
  return classCategory ? classCategory : null;
}

export function findSubClassCategory(
  category: Nullable<ItemCategory | ItemSubCategory>,
  subClassNames: string[],
) {
  let parentCategory: Nullable<ItemCategory | ItemSubCategory> = category;

  for (const subClassName of subClassNames) {
    const subCategory = parentCategory?.subcategories?.find(
      (subCategory) => subCategory.name === subClassName,
    );
    if (!subCategory) {
      return null;
    }

    parentCategory = subCategory;
  }

  return parentCategory;
}

export function buildCategoryOptions(
  categories: ItemCategory[] | ItemSubCategory[],
  parentValue?: string,
): ListSelectorOption<string>[] {
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
    };
  });
}
