"use client";

import Button from "@/components/Button";
import ResponsiveSelector from "@/components/ResponsiveSelector";
import Translation from "@/components/Translation";
import { ITEM_CATEGORIES } from "@/constants/category";
import { useTranslations } from "@/hooks/useTranslations";
import { CategorySelection, ItemCategory } from "@/types/category";
import { Nullable } from "@/types/misc";
import { ListSelectorOption } from "@/types/selector";
import {
  buildCategoryOptions,
  getCategorySelection,
  getSelectedValues,
} from "@/utils/selector";
import { cn } from "@/utils/styles";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState, type FC } from "react";

type Props = {
  className?: string;
  value: Nullable<CategorySelection>;
  onChange?: (value: CategorySelection) => void;
};

const CategorySelector: FC<Props> = ({ className, value, onChange }) => {
  const t = useTranslations();

  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const label = value?.label ? value.label : "";

  return (
    <ResponsiveSelector
      className={cn("", className)}
      breakpoint="md"
      button={{
        size: "md",
        label: label,
        placeholder: t("Filter by category"),
        rightIcon: <ChevronDownIcon />,
      }}
      panel={{
        values: selectedValues,
        options: buildCategoryOptions(ITEM_CATEGORIES),
        drawer: {
          title: t("Filter by category"),
          renderContent: ({ onClose }) => (
            <Button
              className="w-full"
              theme="primary"
              size="md"
              onClick={onClose}
            >
              {label ? label : <Translation messageKey="Close" />}
            </Button>
          ),
        },
        onSelect: handleSelect,
      }}
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

export default CategorySelector;
