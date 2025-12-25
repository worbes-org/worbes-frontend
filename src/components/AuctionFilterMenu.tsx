import MinMaxInput from "@/components/MinMaxInput";
import Slider from "@/components/Slider";
import Translation from "@/components/Translation";
import { ITEM_LEVEL, QUALITY, QUALITY_LABELS } from "@/constants/auction";
import { useTranslations } from "@/hooks/useTranslations";
import { AuctionsFilter } from "@/types/auction";
import { cn } from "@/utils/styles";
import { first, last } from "lodash-es";
import { FC } from "react";

type Props = {
  className?: string;
  filter: AuctionsFilter;
  onChange: (filter: AuctionsFilter) => void;
};

const AuctionFilterMenu: FC<Props> = ({ className, filter, onChange }) => {
  const t = useTranslations();

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
          renderTooltip={(value) => (
            <div className="text-nowrap">{getQualityLabel(value)}</div>
          )}
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
    </div>
  );

  function getQualityLabel(value: number) {
    const label = QUALITY_LABELS[value - QUALITY.MIN];
    if (!label) {
      return null;
    }

    return t(label);
  }
};

export default AuctionFilterMenu;
