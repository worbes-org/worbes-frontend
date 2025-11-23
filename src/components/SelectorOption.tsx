import { cn } from "@/utils/styles";
import { FC } from "react";

type Props = {
  className?: string;
  label: string;
  isSelected?: boolean;
  Icon?: FC<{ className?: string }>;
  onClick?: () => void;
};

const SelectorOption: FC<Props> = ({
  className,
  label,
  isSelected,
  Icon,
  onClick,
}) => {
  return (
    <button
      className={cn(
        "relative flex items-center gap-x-2 text-sm font-medium",
        isSelected && "bg-accent-600/10 text-accent-600",
        !isSelected && "hover:bg-gray-700",
        className,
      )}
      onClick={onClick}
    >
      {Icon && <Icon className="size-4 text-current" />}
      {label}
      {isSelected && (
        <div className="ml-auto size-1.5 rounded-full bg-accent-600" />
      )}
    </button>
  );
};

export default SelectorOption;
