"use client";

import BottomDrawer from "@/components/BottomDrawer";
import Button from "@/components/Button";
import CategorySelectorPanel from "@/components/CategorySelectorPanel";
import Responsive from "@/components/Responsive";
import SelectorTrigger from "@/components/SelectorTrigger";
import SideDrawer from "@/components/SideDrawer";
import Translation from "@/components/Translation";
import { useTranslations } from "@/hooks/useTranslations";
import { cn } from "@/utils/styles";
import { ChevronDownIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { type FC } from "react";

type Props = {
  className?: string;
};

const CategorySelector: FC<Props> = ({ className }) => {
  const t = useTranslations();

  return (
    <SelectorTrigger
      className={cn("", className)}
      theme="primary"
      size="md"
      placeholder={t("Filter by category")}
      LeftIcon={FunnelIcon}
      RightIcon={ChevronDownIcon}
    >
      {({ isOpen, setLabel, onClose }) => (
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
                renderButton={({ label }) => (
                  <Button
                    className="w-full"
                    theme="primary"
                    size="md"
                    onClick={() => {
                      setLabel(label);
                      onClose();
                    }}
                  >
                    {label ? label : <Translation messageKey="Close" />}
                  </Button>
                )}
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
                listClassName="overflow-y-auto"
                onChange={({ label }) => setLabel(label)}
              />
            </SideDrawer>
          }
        />
      )}
    </SelectorTrigger>
  );
};

export default CategorySelector;
