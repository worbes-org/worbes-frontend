import BottomDrawer from "@/components/BottomDrawer";
import DropdownPanel from "@/components/DropdownPanel";
import Input from "@/components/Input";
import ListSelector from "@/components/ListSelector";
import MenuTrigger from "@/components/MenuTrigger";
import MinMaxInput from "@/components/MinMaxInput";
import Responsive from "@/components/Responsive";
import Slider from "@/components/Slider";
import Translation from "@/components/Translation";
import {
  EXPANSIONS,
  ITEM_LEVEL,
  QUALITY,
  QUALITY_LABELS,
} from "@/constants/auction";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { useTranslations } from "@/hooks/useTranslations";
import { AuctionsFilter } from "@/types/auction";
import { getExpansionLabel, getQualityLabel } from "@/utils/auction";
import { cn } from "@/utils/styles";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { first, last } from "lodash-es";
import { FC } from "react";

type Props = {
  className?: string;
  filter: AuctionsFilter;
  onChange: (filter: AuctionsFilter) => void;
};

const AuctionFilterMenu: FC<Props> = ({ className, filter, onChange }) => {
  const t = useTranslations();
  const isSmBreakpoint = useBreakpoint("sm");

  return (
    <div
      className={cn(
        "divide-y divide-gray-600 *:py-4 *:first:pt-0 *:last:pb-0",
        className,
      )}
    >
      <div className="space-y-2">
        <Translation
          className="text-gray-200"
          messageKey="Item Level"
          as="h3"
        />
        <MinMaxInput
          size="md"
          value={{ min: filter.minItemLevel, max: filter.maxItemLevel }}
          limit={{ min: ITEM_LEVEL.MIN, max: ITEM_LEVEL.MAX }}
          minPlaceholder={t("Min")}
          maxPlaceholder={t("Max")}
          onChange={(value) =>
            onChange({
              ...filter,
              minItemLevel: value.min,
              maxItemLevel: value.max,
            })
          }
        />
      </div>

      <div className="space-y-4">
        <Translation
          className="text-gray-200"
          messageKey="Item rarity"
          as="h3"
        />
        <Slider
          min={QUALITY.MIN}
          max={QUALITY.MAX}
          step={1}
          showTicks
          value={{
            start: filter.minQuality ?? QUALITY.MIN,
            end: filter.maxQuality ?? QUALITY.MAX,
          }}
          renderTooltip={(value) => {
            const label = getQualityLabel(value);
            return label ? t(label) : null;
          }}
          onChange={(value) =>
            onChange({
              ...filter,
              minQuality: value.start,
              maxQuality: value.end,
            })
          }
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <div className="size-3.5 rounded-sm bg-gray-400 drop-shadow-[0_0_2px_var(--color-gray-400)]" />
            <div className="text-sm font-medium text-gray-300">
              <Translation messageKey={first(QUALITY_LABELS)} />
            </div>
          </div>
          <div className="text-gray-400">~</div>
          <div className="flex items-center gap-x-2">
            <div className="text-sm font-medium text-orange">
              <Translation messageKey={last(QUALITY_LABELS)!} />
            </div>
            <div className="size-3.5 rounded-sm bg-orange drop-shadow-[0_0_2px_var(--color-orange)]" />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Translation className="text-gray-200" messageKey="Expansion" as="h3" />
        <MenuTrigger
          closeOnClickAway={isSmBreakpoint}
          renderButton={({ isOpen, onClick }) => {
            const label = filter.expansionId
              ? getExpansionLabel(filter.expansionId)
              : null;

            return (
              <div role="button" onClick={onClick}>
                <Input
                  className="pointer-events-none"
                  size="md"
                  placeholder={t("All Expansions")}
                  value={label ? t(label) : undefined}
                  rightIcon={
                    <ChevronDownIcon
                      className={cn(
                        "size-5 text-gray-300 transition-transform duration-200",
                        isOpen && "rotate-180",
                      )}
                    />
                  }
                />
              </div>
            );
          }}
          renderMenu={({ isOpen, onClose }) => {
            const selectedValues =
              typeof filter.expansionId === "number"
                ? [filter.expansionId]
                : [];

            return (
              <Responsive
                mobile={
                  <BottomDrawer
                    title="Expansion"
                    theme="primary"
                    isOpen={isOpen}
                    onClose={onClose}
                  >
                    <ListSelector
                      listClassName="max-h-[60dvh] overflow-y-auto"
                      fadeGradientClassName={{
                        to: "to-gray-900",
                      }}
                      options={EXPANSIONS.map((expansion) => ({
                        ...expansion,
                        label: t(expansion.label),
                      }))}
                      selectedValues={selectedValues}
                      onSelect={(value) =>
                        onChange({ ...filter, expansionId: value.value })
                      }
                    />
                  </BottomDrawer>
                }
                desktop={
                  <DropdownPanel
                    className="overflow-hidden"
                    position="bottom"
                    isOpen={isOpen}
                  >
                    <ListSelector
                      listClassName="max-h-80 overflow-y-auto"
                      fadeGradientClassName={{
                        to: "to-gray-900",
                      }}
                      options={EXPANSIONS.map((expansion) => ({
                        ...expansion,
                        label: t(expansion.label),
                      }))}
                      selectedValues={selectedValues}
                      onSelect={(value) =>
                        onChange({ ...filter, expansionId: value.value })
                      }
                    />
                  </DropdownPanel>
                }
              />
            );
          }}
        />
      </div>
    </div>
  );
};

export default AuctionFilterMenu;
