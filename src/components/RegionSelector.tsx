"use client";

import BottomDrawer from "@/components/BottomDrawer";
import DropdownPanel from "@/components/DropdownPanel";
import ListSelector from "@/components/ListSelector";
import Responsive from "@/components/Responsive";
import SelectorTrigger from "@/components/SelectorTrigger";
import { Region } from "@/constants/game-server";
import { useSelectedRegion } from "@/hooks/useSelectedRegion";
import { useTranslations } from "@/hooks/useTranslations";
import { cn } from "@/utils/styles";
import { ChevronDownIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { type FC } from "react";

type Props = {
  className?: string;
};

const RegionSelector: FC<Props> = ({ className }) => {
  const t = useTranslations();

  const [selectedRegion, setSelectedRegion] = useSelectedRegion();

  const label = selectedRegion
    ? t("Region: {selectedRegion}", { selectedRegion })
    : "";

  return (
    <SelectorTrigger
      className={cn("", className)}
      theme="primary"
      size="md"
      label={label}
      placeholder={t("Select region")}
      LeftIcon={GlobeAltIcon}
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
                options={Object.values(Region).map((region) => ({
                  label: region,
                  value: region,
                }))}
                selectedValues={[selectedRegion]}
                onSelect={(option) => setSelectedRegion(option.value)}
              />
            </BottomDrawer>
          }
          desktop={
            <DropdownPanel isOpen={isOpen} closeOnClick onClose={onClose}>
              <ListSelector
                options={Object.values(Region).map((region) => ({
                  label: region,
                  value: region,
                }))}
                selectedValues={[selectedRegion]}
                onSelect={(option) => setSelectedRegion(option.value)}
              />
            </DropdownPanel>
          }
        />
      )}
    </SelectorTrigger>
  );
};

export default RegionSelector;
