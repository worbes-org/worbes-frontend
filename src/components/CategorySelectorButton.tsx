"use client";

import BottomDrawer from "@/components/BottomDrawer";
import Button from "@/components/Button";
import CategorySelector from "@/components/CategorySelector";
import Input from "@/components/Input";
import Translation from "@/components/Translation";
import { useTranslations } from "@/hooks/useTranslations";
import { cn } from "@/utils/styles";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { useState, type FC } from "react";

type Props = {
  className?: string;
};

const CategorySelectorButton: FC<Props> = ({ className }) => {
  const t = useTranslations();

  const [isOpen, setIsOpen] = useState(false);
  const [label, setLabel] = useState<string>(t("Filter by category"));

  return (
    <>
      <div
        className={cn("", className)}
        role="button"
        onClick={handleToggle(true)}
      >
        <Input
          className="pointer-events-none mt-8"
          theme="primary"
          size="md"
          placeholder={isOpen ? t("Filter by category") : label}
          Icon={FunnelIcon}
        />
      </div>

      <BottomDrawer
        title={t("Filter by category")}
        theme="primary"
        isOpen={isOpen}
        onClose={handleToggle(false)}
      >
        <CategorySelector listClassName="scrollbar-hide h-[calc(65dvh-10.5rem)] overflow-y-auto">
          {({ label }) => (
            <Button
              className="w-full"
              theme="primary"
              size="md"
              onClick={handleApplyClick(label)}
            >
              {label ? label : <Translation messageKey="Close" />}
            </Button>
          )}
        </CategorySelector>
      </BottomDrawer>
    </>
  );

  function handleToggle(visible: boolean) {
    return () => setIsOpen(visible);
  }

  function handleApplyClick(label?: string) {
    return () => {
      setLabel(label ?? t("Filter by category"));
      setIsOpen(false);
    };
  }
};

export default CategorySelectorButton;
