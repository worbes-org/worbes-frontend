import { cn } from "@/utils/styles";
import { CheckIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, FC } from "react";

type Props = {
  className?: string;
  isSelected: boolean;
  onChange?: (isSelected: boolean) => void;
};

const Checkbox: FC<Props> = ({ className, isSelected, onChange }) => {
  return (
    <div
      className={cn(
        "relative size-4 rounded-sm",
        isSelected && "bg-accent-600",
        className,
      )}
    >
      {isSelected && <CheckIcon className="size-full stroke-2 text-white" />}
      <input
        className="absolute size-full opacity-0"
        type="checkbox"
        checked={isSelected}
        onChange={handleChange}
      />
    </div>
  );

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange?.(e.target.checked);
  }
};

export default Checkbox;
