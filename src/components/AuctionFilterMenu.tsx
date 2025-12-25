import Button from "@/components/Button";
import ExpansionMenuTrigger from "@/components/ExpansionMenuTrigger";
import MinMaxInput from "@/components/MinMaxInput";
import QualitySlider from "@/components/QualitySlider";
import Translation from "@/components/Translation";
import { ITEM_LEVEL } from "@/constants/auction";
import { useTranslations } from "@/hooks/useTranslations";
import { AuctionsFilter } from "@/types/auction";
import { cn } from "@/utils/styles";
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
        <QualitySlider
          value={{
            start: localFilter.minQuality,
            end: localFilter.maxQuality,
          }}
          onChange={(value) =>
            setLocalFilter({
              ...localFilter,
              minQuality: value.start,
              maxQuality: value.end,
            })
          }
        />
      </div>

      <div className="space-y-2">
        <Translation className="text-gray-200" messageKey="Expansion" as="h3" />
        <ExpansionMenuTrigger
          value={localFilter.expansionId}
          onChange={(value) =>
            setLocalFilter({ ...localFilter, expansionId: value })
          }
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
