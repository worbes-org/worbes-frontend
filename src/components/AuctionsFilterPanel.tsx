import BottomDrawer from "@/components/BottomDrawer";
import DropdownPanel from "@/components/DropdownPanel";
import NestedListSelector from "@/components/NestedListSelector";
import Responsive from "@/components/Responsive";
import SelectorTrigger from "@/components/SelectorTrigger";
import Slider from "@/components/Slider";
import Translation from "@/components/Translation";
import { EXPANSIONS, ITEM_LEVEL, QUALITY } from "@/constants/auction";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useTranslations } from "@/hooks/useTranslations";
import { AuctionsFilter } from "@/types/auction";
import { ListSelectorOption } from "@/types/selector";
import { cn } from "@/utils/styles";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { type FC } from "react";

type Filter = Pick<
  AuctionsFilter,
  "minQuality" | "maxQuality" | "minItemLevel" | "maxItemLevel" | "expansionId"
>;

type Props = {
  className?: string;
  filter: Filter;
  onChange: (filter: Filter) => void;
};

const AuctionsFilterPanel: FC<Props> = ({ className, filter, onChange }) => {
  const t = useTranslations();
  const isMdBreakpoint = useBreakpoint("md");

  const selectedExpansion = EXPANSIONS.find(
    (expansion) => expansion.value === filter.expansionId,
  );

  return (
    <div className={cn("space-y-8", className)}>
      <div className="space-y-4">
        <Translation
          className="text-md block font-semibold text-green-300"
          messageKey="Quality: {min}~{max}"
          values={{
            min: filter.minQuality ?? QUALITY.MIN,
            max: filter.maxQuality ?? QUALITY.MAX,
          }}
        />

        <Slider
          min={QUALITY.MIN}
          max={QUALITY.MAX}
          step={1}
          value={{
            start: filter.minQuality ?? QUALITY.MIN,
            end: filter.maxQuality ?? QUALITY.MAX,
          }}
          onChange={(value) =>
            onChange({
              minQuality: value.start,
              maxQuality: value.end,
            })
          }
        />
      </div>

      <div className="space-y-4">
        <Translation
          className="text-md block font-semibold text-green-300"
          messageKey="Item level: {min}~{max}"
          values={{
            min: filter.minItemLevel ?? ITEM_LEVEL.MIN,
            max: filter.maxItemLevel ?? ITEM_LEVEL.MAX,
          }}
        />
        <Slider
          min={ITEM_LEVEL.MIN}
          max={ITEM_LEVEL.MAX}
          step={1}
          value={{
            start: filter.minItemLevel ?? ITEM_LEVEL.MIN,
            end: filter.maxItemLevel ?? ITEM_LEVEL.MAX,
          }}
          onChange={(value) =>
            onChange({
              minItemLevel: value.start,
              maxItemLevel: value.end,
            })
          }
        />
      </div>

      <SelectorTrigger
        label={
          selectedExpansion
            ? t("Expansion: {expansion}", {
                expansion: selectedExpansion.label,
              })
            : undefined
        }
        theme="primary"
        size="md"
        RightIcon={ChevronDownIcon}
        placeholder={t("Select Expansion")}
        closeOnClickAway={isMdBreakpoint}
      >
        {({ isOpen, onClose }) => (
          <Responsive
            mobile={
              <BottomDrawer
                theme="primary"
                title={t("Select Expansion")}
                isOpen={isOpen}
                onClose={onClose}
              >
                <NestedListSelector
                  className="scrollbar-hide max-h-[calc(95dvh-8rem)] overflow-y-auto"
                  options={EXPANSIONS}
                  selectedValues={
                    selectedExpansion ? [selectedExpansion.value] : []
                  }
                  onSelect={handleExpansionChange}
                />
              </BottomDrawer>
            }
            desktop={
              <DropdownPanel isOpen={isOpen} closeOnClick onClose={onClose}>
                <NestedListSelector
                  options={EXPANSIONS}
                  selectedValues={
                    selectedExpansion ? [selectedExpansion.value] : []
                  }
                  onSelect={handleExpansionChange}
                />
              </DropdownPanel>
            }
          />
        )}
      </SelectorTrigger>
    </div>
  );

  function handleExpansionChange(option: ListSelectorOption<number>) {
    onChange({
      expansionId:
        filter.expansionId === option.value ? undefined : option.value,
    });
  }
};

export default AuctionsFilterPanel;
