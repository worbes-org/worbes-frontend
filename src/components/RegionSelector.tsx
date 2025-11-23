"use client";

import BottomDrawer from "@/components/BottomDrawer";
import DropdownPanel from "@/components/DropdownPanel";
import ListSelector from "@/components/ListSelector";
import Responsive from "@/components/Responsive";
import SelectorTrigger from "@/components/SelectorTrigger";
import { Region } from "@/constants/game-server";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useTranslations } from "@/hooks/useTranslations";
import { Nullable } from "@/types/misc";
import { cn } from "@/utils/styles";
import { ChevronDownIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { type FC } from "react";

type Props = {
  className?: string;
  value: Nullable<Region>;
  onChange: (value: Region) => void;
};

const RegionSelector: FC<Props> = ({ className, value, onChange }) => {
  const t = useTranslations();
  const isMdBreakpoint = useBreakpoint("md");

  const label = value
    ? t("Region: {selectedRegion}", { selectedRegion: value })
    : "";

  return (
    <SelectorTrigger
      className={cn("", className)}
      size="md"
      label={label}
      placeholder={t("Select region")}
      closeOnClickAway={isMdBreakpoint}
      leftIcon={<GlobeAltIcon />}
      rightIcon={<ChevronDownIcon />}
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
                selectedValues={[value]}
                onSelect={(option) => onChange(option.value)}
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
                selectedValues={[value]}
                onSelect={(option) => onChange(option.value)}
              />
            </DropdownPanel>
          }
        />
      )}
    </SelectorTrigger>
  );
};

export default RegionSelector;
