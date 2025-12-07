"use client";

import { cn } from "@/utils/styles";
import { type FC } from "react";

export type SegmentedControlOption<T = string> = {
  value: T;
  label: string;
  Icon?: FC<{ className?: string }>;
  disabled?: boolean;
};

type Props<T = string> = {
  className?: string;
  value?: T;
  options: SegmentedControlOption<T>[];
  size: "sm" | "md" | "lg";
  disabled?: boolean;
  fullWidth?: boolean;
  onChange?: (value: T) => void;
};

const SegmentedControl = <T extends string | number = string>({
  className,
  value,
  options,
  size,
  disabled,
  fullWidth,
  onChange,
}: Props<T>) => {
  return (
    <div
      className={cn(
        "inline-flex space-x-1 rounded-lg border border-[#23252a] bg-gray-900 p-1",
        !fullWidth && "w-fit",
        fullWidth && "w-full",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
      role="tablist"
    >
      {options.map((option, index) => {
        const isSelected = option.value === value;
        const isDisabled = disabled || option.disabled;

        return (
          <button
            key={String(option.value)}
            type="button"
            role="tab"
            aria-selected={isSelected}
            disabled={isDisabled}
            onClick={() => !isDisabled && onChange?.(option.value)}
            className={cn(
              "relative flex items-center justify-center gap-2 rounded-md font-medium transition-all",
              "focus-visible:ring-2 focus-visible:ring-accent-700 focus-visible:ring-offset-1 focus-visible:outline-none",
              "disabled:cursor-not-allowed",
              size === "sm" && "h-8 px-3 text-sm",
              size === "md" && "h-10 px-4 text-sm",
              size === "lg" && "h-12 px-6 text-base",
              fullWidth && "flex-1",
              isSelected && "bg-accent-600 text-white shadow-sm",
              !isSelected &&
                !isDisabled &&
                "text-gray-200 hover:bg-white/5 hover:text-gray-100",
              isDisabled && !isSelected && "text-gray-400",
            )}
          >
            {option.Icon && (
              <option.Icon
                className={cn(
                  "shrink-0",
                  size === "sm" && "size-3.5",
                  size === "md" && "size-4",
                  size === "lg" && "size-5",
                  isSelected ? "text-white" : "text-current",
                )}
              />
            )}
            <span className="truncate">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default SegmentedControl;
