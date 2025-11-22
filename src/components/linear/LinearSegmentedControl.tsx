"use client";

import { cn } from "@/utils/styles";
import { type ReactNode } from "react";

export type LinearSegmentedControlOption<T = string> = {
  value: T;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
};

type LinearSegmentedControlSize = "sm" | "md" | "lg";

type Props<T = string> = {
  options: LinearSegmentedControlOption<T>[];
  value?: T;
  onChange?: (value: T) => void;
  size?: LinearSegmentedControlSize;
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
};

const LinearSegmentedControl = <T extends string | number = string>({
  options,
  value,
  onChange,
  size = "md",
  disabled = false,
  className,
  fullWidth = false,
}: Props<T>) => {
  const sizeClasses = {
    sm: "h-8 text-sm px-3",
    md: "h-10 text-sm px-4",
    lg: "h-12 text-base px-6",
  };

  const iconSizeClasses = {
    sm: "size-3.5",
    md: "size-4",
    lg: "size-5",
  };

  return (
    <div
      className={cn(
        "inline-flex rounded-lg border border-[#23252a] bg-gray-900 p-1",
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
              sizeClasses[size],
              // 선택된 상태
              isSelected && "bg-accent-600 text-white shadow-sm",
              // 선택되지 않은 상태
              !isSelected &&
                !isDisabled &&
                "text-gray-200 hover:bg-white/5 hover:text-gray-100",
              // 비활성 상태
              isDisabled && !isSelected && "text-gray-400",
              // 첫 번째와 마지막 항목의 간격 조정
              index > 0 && "ml-0.5",
            )}
          >
            {option.icon && (
              <span
                className={cn(
                  "shrink-0",
                  iconSizeClasses[size],
                  isSelected ? "text-white" : "text-current",
                )}
              >
                {option.icon}
              </span>
            )}
            <span className="truncate">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default LinearSegmentedControl;
