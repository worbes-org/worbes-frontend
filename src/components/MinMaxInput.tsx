import Input from "@/components/Input";
import { cn } from "@/utils/styles";
import { clamp } from "lodash-es";
import { type FC } from "react";

type Props = {
  className?: string;
  size: "sm" | "md" | "lg";
  value?: { min?: number; max?: number };
  limit: { min: number; max: number };
  minPlaceholder?: string;
  maxPlaceholder?: string;
  onChange?: (value: { min: number; max: number }) => void;
};

const MinMaxInput: FC<Props> = ({
  className,
  size,
  value,
  limit,
  minPlaceholder,
  maxPlaceholder,
  onChange,
}) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Input
        type="number"
        size={size}
        value={value?.min ?? ""}
        placeholder={minPlaceholder}
        onChange={(e) =>
          handleChange({
            min: Number(e.target.value),
            max: value?.max ?? limit.max,
          })
        }
      />
      <span className="shrink-0 text-gray-400">~</span>
      <Input
        type="number"
        size={size}
        value={value?.max ?? ""}
        placeholder={maxPlaceholder}
        onChange={(e) =>
          handleChange({
            min: value?.min ?? limit.min,
            max: Number(e.target.value),
          })
        }
      />
    </div>
  );

  function handleChange(value: { min: number; max: number }) {
    value.min = clamp(value.min, limit.min, limit.max);
    value.max = clamp(value.max, limit.min, limit.max);

    if (value.min > value.max) {
      onChange?.({
        min: value.min,
        max: value.min,
      });
      return;
    }

    onChange?.(value);
  }
};

export default MinMaxInput;
