import BottomDrawer from "@/components/BottomDrawer";
import Button from "@/components/Button";
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
import { FC, useState } from "react";

type Props = {
  className?: string;
  filter: AuctionsFilter;
  onApply: (filter: AuctionsFilter) => void;
  onClose?: () => void;
};

const AuctionFilterMenu: FC<Props> = ({
  className,
  filter,
  onApply,
  onClose,
}) => {
  const t = useTranslations();
  const isSmBreakpoint = useBreakpoint("sm");
  const [localFilter, setLocalFilter] = useState(filter);

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
          value={{
            min: localFilter.minItemLevel,
            max: localFilter.maxItemLevel,
          }}
          limit={{ min: ITEM_LEVEL.MIN, max: ITEM_LEVEL.MAX }}
          minPlaceholder={t("Min")}
          maxPlaceholder={t("Max")}
          onChange={(value) =>
            setLocalFilter({
              ...localFilter,
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
            start: localFilter.minQuality ?? QUALITY.MIN,
            end: localFilter.maxQuality ?? QUALITY.MAX,
          }}
          renderTooltip={(value) => {
            const label = getQualityLabel(value);

            return <div className="text-nowrap">{label ? t(label) : null}</div>;
          }}
          onChange={(value) =>
            setLocalFilter({
              ...localFilter,
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
            const label = localFilter.expansionId
              ? getExpansionLabel(localFilter.expansionId)
              : null;

            return (
              <div role="button" onClick={onClick}>
                <Input
                  className="pointer-events-none"
                  size="md"
                  placeholder={t("All Expansions")}
                  value={label ? t(label) : ""}
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
          renderMenu={({ isOpen, onClose: closeExpansionMenu }) => {
            const selectedValues =
              typeof localFilter.expansionId === "number"
                ? [localFilter.expansionId]
                : [];

            return (
              <Responsive
                mobile={
                  <BottomDrawer
                    title="Expansion"
                    theme="primary"
                    isOpen={isOpen}
                    onClose={closeExpansionMenu}
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
                      onSelect={(value) => {
                        setLocalFilter({
                          ...localFilter,
                          expansionId: value.value,
                        });
                        closeExpansionMenu();
                      }}
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
                      onSelect={(value) => {
                        setLocalFilter({
                          ...localFilter,
                          expansionId: value.value,
                        });
                        closeExpansionMenu();
                      }}
                    />
                  </DropdownPanel>
                }
              />
            );
          }}
        />
      </div>

      <div className="flex justify-between gap-2">
        <Button theme="secondary" size="md" onClick={handleReset}>
          <Translation messageKey="Reset" />
        </Button>
        <Button
          className="not-sm:flex-1"
          theme="quaternary"
          size="md"
          onClick={handleApply}
        >
          <Translation messageKey="Apply" />
        </Button>
      </div>
    </div>
  );

  function handleReset() {
    setLocalFilter(filter);
  }

  function handleApply() {
    onApply(localFilter);
    onClose?.();
  }
};

export default AuctionFilterMenu;
