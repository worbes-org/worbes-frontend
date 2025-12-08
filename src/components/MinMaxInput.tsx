import Input from "@/components/Input";
import { cn } from "@/utils/styles";
import { type FC } from "react";

type Props = {
  className?: string;
  size: "sm" | "md" | "lg";
  value?: { min?: number; max?: number };
  minPlaceholder?: string;
  maxPlaceholder?: string;
  onChange?: (value: { min?: number; max?: number }) => void;
};

const MinMaxInput: FC<Props> = ({
  className,
  size,
  value,
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
          onChange?.({
            min: e.target.value ? Number(e.target.value) : undefined,
            max: value?.max,
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
          onChange?.({
            min: value?.min,
            max: e.target.value ? Number(e.target.value) : undefined,
          })
        }
      />
    </div>
  );
};

export default MinMaxInput;
