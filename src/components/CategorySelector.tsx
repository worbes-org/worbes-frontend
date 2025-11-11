"use client";

import BottomDrawer from "@/components/BottomDrawer";
import Button from "@/components/Button";
import CategorySelectorPanel from "@/components/CategorySelectorPanel";
import Responsive from "@/components/Responsive";
import SelectorTrigger from "@/components/SelectorTrigger";
import SideDrawer from "@/components/SideDrawer";
import Translation from "@/components/Translation";
import { useTranslations } from "@/hooks/useTranslations";
import { CategorySelection } from "@/types/category";
import { Nullable } from "@/types/misc";
import { cn } from "@/utils/styles";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { type FC } from "react";

type Props = {
  className?: string;
  value: Nullable<CategorySelection>;
  onChange?: (value: CategorySelection) => void;
};

const CategorySelector: FC<Props> = ({ className, value, onChange }) => {
  const t = useTranslations();

  const label = value?.label ? value.label : "";

  return (
    <SelectorTrigger
      className={cn("", className)}
      theme="primary"
      size="md"
      label={label}
      placeholder={t("Filter by category")}
      RightIcon={ChevronDownIcon}
      closeOnClickAway={false}
    >
      {({ isOpen, onClose }) => (
        <Responsive
          mobile={
            <BottomDrawer
              title={t("Filter by category")}
              theme="primary"
              isOpen={isOpen}
              onClose={onClose}
            >
              <CategorySelectorPanel
                listClassName="scrollbar-hide h-[calc(65dvh-10.5rem)] overflow-y-auto"
                value={value}
                renderButton={() => (
                  <Button
                    className="w-full"
                    theme="primary"
                    size="md"
                    onClick={onClose}
                  >
                    {label ? label : <Translation messageKey="Close" />}
                  </Button>
                )}
                onChange={onChange}
              />
            </BottomDrawer>
          }
          desktop={
            <SideDrawer
              className="min-w-[30rem] px-4"
              isOpen={isOpen}
              position="right"
              onClose={onClose}
            >
              <CategorySelectorPanel
                listClassName="scrollbar-hide h-dvh overflow-y-auto"
                value={value}
                onChange={onChange}
              />
            </SideDrawer>
          }
        />
      )}
    </SelectorTrigger>
  );
};

export default CategorySelector;
