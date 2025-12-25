import Slider from "@/components/Slider";
import Translation from "@/components/Translation";
import { QUALITY } from "@/constants/auction";
import { useTranslations } from "@/hooks/useTranslations";
import { getQualityColor, getQualityLabel } from "@/utils/auction";
import { cn } from "@/utils/styles";
import { FC } from "react";

type Props = {
  className?: string;
  value: { start?: number; end?: number };
  onChange: (value: { start: number; end: number }) => void;
};

const QualitySlider: FC<Props> = ({ className, value, onChange }) => {
  const t = useTranslations();

  const minQuality = value.start ?? QUALITY.MIN;
  const maxQuality = value.end ?? QUALITY.MAX;
  const minLabel = getQualityLabel(minQuality);
  const maxLabel = getQualityLabel(maxQuality);

  return (
    <div className={cn("space-y-4", className)}>
      <Slider
        min={QUALITY.MIN}
        max={QUALITY.MAX}
        step={1}
        showTicks
        value={{ start: minQuality, end: maxQuality }}
        renderTooltip={(val) => {
          const label = getQualityLabel(val);
          return <div className="text-nowrap">{label ? t(label) : null}</div>;
        }}
        onChange={onChange}
      />

      {minLabel && maxLabel && (
        <div className="flex items-center justify-between">
          <QualityIndicator label={minLabel} />
          <div className="text-gray-400">~</div>
          <QualityIndicator label={maxLabel} reverse />
        </div>
      )}
    </div>
  );
};

const QualityIndicator: FC<{
  className?: string;
  label: Exclude<ReturnType<typeof getQualityLabel>, null>;
  reverse?: boolean;
}> = ({ className, label, reverse }) => {
  const color = getQualityColor(label) ?? undefined;

  return (
    <div
      className={cn(
        "flex items-center gap-x-2",
        reverse && "flex-row-reverse",
        className,
      )}
    >
      <div
        className="size-3.5 rounded-sm"
        style={{ backgroundColor: color, boxShadow: `0 0 2px ${color}` }}
      />
      <Translation
        className="text-sm font-medium"
        style={{ color }}
        messageKey={label}
      />
    </div>
  );
};

export default QualitySlider;
