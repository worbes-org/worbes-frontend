"use client";

import BottomDrawer from "@/components/BottomDrawer";
import DropdownPanel from "@/components/DropdownPanel";
import ListSelector from "@/components/ListSelector";
import Responsive from "@/components/Responsive";
import SelectorTrigger from "@/components/SelectorTrigger";
import { useSelectedRealm } from "@/hooks/useSelectedRealm";
import { useTranslations } from "@/hooks/useTranslations";
import { cn } from "@/utils/styles";
import {
  BuildingOfficeIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { type FC } from "react";

type Props = {
  className?: string;
};

const RealmSelector: FC<Props> = ({ className }) => {
  const t = useTranslations();

  const [selectedRealm, setSelectedRealm] = useSelectedRealm();

  const label = selectedRealm
    ? t("Selected realm: {selectedRealm}", { selectedRealm: "asd" })
    : "";

  return (
    <SelectorTrigger
      className={cn("", className)}
      theme="primary"
      size="md"
      label={label}
      placeholder={t("Select region")}
      LeftIcon={BuildingOfficeIcon}
      RightIcon={ChevronDownIcon}
    >
      {({ isOpen, onClose }) => (
        <Responsive
          mobile={
            <BottomDrawer
              title={t("Select region")}
              theme="primary"
              isOpen={isOpen}
              onClose={onClose}
            >
              <ListSelector
                options={[]}
                selectedValues={[]}
                onSelect={(option) => setSelectedRealm(option.value)}
              />
            </BottomDrawer>
          }
          desktop={
            <DropdownPanel isOpen={isOpen} closeOnClick onClose={onClose}>
              <ListSelector
                options={[]}
                selectedValues={[]}
                onSelect={(option) => setSelectedRealm(option.value)}
              />
            </DropdownPanel>
          }
        />
      )}
    </SelectorTrigger>
  );
};

export default RealmSelector;
