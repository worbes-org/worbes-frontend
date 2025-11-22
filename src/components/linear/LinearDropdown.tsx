"use client";

import { cn } from "@/utils/styles";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

export type LinearDropdownOption<T = string> = {
  value: T;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  metadata?: unknown;
};

type LinearDropdownSize = "sm" | "md" | "lg";
type LinearDropdownVariant = "default" | "input";

type Props<T = string> = {
  options: LinearDropdownOption<T>[];
  value?: T;
  onChange?: (value: T, option: LinearDropdownOption<T>) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
  size?: LinearDropdownSize;
  variant?: LinearDropdownVariant;
  searchable?: boolean;
  searchPlaceholder?: string;
  disabled?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  emptyMessage?: string;
  className?: string;
  triggerClassName?: string;
  dropdownClassName?: string;
  renderOption?: (option: LinearDropdownOption<T>) => ReactNode;
  renderTrigger?: (props: {
    isOpen: boolean;
    selectedOption?: LinearDropdownOption<T>;
    placeholder?: string;
  }) => ReactNode;
};

const LinearDropdown = <T extends string | number = string>({
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  label,
  error,
  helperText,
  size = "md",
  variant = "default",
  searchable = false,
  searchPlaceholder = "Search...",
  disabled = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  emptyMessage = "No options available",
  className,
  triggerClassName,
  dropdownClassName,
  renderOption,
  renderTrigger,
}: Props<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const optionsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = searchable
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : options;

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
        setFocusedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // 검색 가능한 경우 포커스
      if (searchable && searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, searchable]);

  // 키보드 네비게이션
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (disabled || isLoading) return;

    switch (e.key) {
      case "Enter":
      case " ":
        if (!isOpen) {
          e.preventDefault();
          setIsOpen(true);
        } else if (focusedIndex >= 0 && filteredOptions[focusedIndex]) {
          e.preventDefault();
          handleSelect(filteredOptions[focusedIndex]);
        }
        break;
      case "ArrowDown":
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          setFocusedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : prev,
          );
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (isOpen) {
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSearchQuery("");
        setFocusedIndex(-1);
        triggerRef.current?.focus();
        break;
    }
  };

  // 포커스된 옵션으로 스크롤
  useEffect(() => {
    if (focusedIndex >= 0 && optionsRef.current[focusedIndex]) {
      optionsRef.current[focusedIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [focusedIndex]);

  const handleSelect = (option: LinearDropdownOption<T>) => {
    if (option.disabled) return;
    onChange?.(option.value, option);
    setIsOpen(false);
    setSearchQuery("");
    setFocusedIndex(-1);
  };

  const handleToggle = () => {
    if (disabled || isLoading) return;
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      setFocusedIndex(-1);
    }
  };

  const sizeClasses = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-3 text-sm",
    lg: "h-12 px-4 text-base",
  };

  const defaultTrigger = (
    <div
      ref={triggerRef}
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
      onClick={handleToggle}
      className={cn(
        "w-full rounded-lg border bg-gray-900 text-gray-100",
        "flex cursor-pointer items-center gap-2 transition-colors",
        "focus-visible:ring-2 focus-visible:ring-accent-700 focus-visible:ring-offset-2 focus-visible:outline-none",
        disabled && "cursor-not-allowed opacity-50",
        isLoading && "cursor-wait",
        error ? "border-red" : "border-[#23252a]",
        !error && !disabled && "hover:border-[#34343a]",
        sizeClasses[size],
        triggerClassName,
      )}
    >
      {leftIcon && <div className="shrink-0 text-gray-300">{leftIcon}</div>}
      <span
        className={cn(
          "flex-1 truncate text-left",
          !selectedOption && "text-gray-400",
        )}
      >
        {selectedOption ? selectedOption.label : placeholder}
      </span>
      {rightIcon ? (
        <div className="shrink-0 text-gray-300">{rightIcon}</div>
      ) : (
        <ChevronDownIcon
          className={cn(
            "size-4 shrink-0 text-gray-300 transition-transform",
            isOpen && "rotate-180",
          )}
        />
      )}
    </div>
  );

  return (
    <div className={cn("relative w-full", className)}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-gray-200">
          {label}
        </label>
      )}
      {renderTrigger ? (
        <div onClick={handleToggle} className="cursor-pointer">
          {renderTrigger({
            isOpen,
            selectedOption,
            placeholder,
          })}
        </div>
      ) : (
        defaultTrigger
      )}
      {isOpen && (
        <div
          ref={dropdownRef}
          className={cn(
            "absolute z-[1000] mt-2 w-full overflow-hidden rounded-lg border border-[#23252a] bg-gray-800 shadow-[0px_4px_24px_rgba(0,0,0,0.2)]",
            dropdownClassName,
          )}
          role="listbox"
        >
          {searchable && (
            <div className="border-b border-[#23252a] p-2">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setFocusedIndex(-1);
                }}
                placeholder={searchPlaceholder}
                className="w-full rounded-md border border-[#23252a] bg-gray-900 px-3 py-1.5 text-sm text-gray-100 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-accent-700 focus-visible:ring-offset-1 focus-visible:outline-none"
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                    e.preventDefault();
                    setFocusedIndex(0);
                  }
                }}
              />
            </div>
          )}
          <div className="max-h-[300px] overflow-y-auto py-2">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <p className="text-sm text-gray-300">{emptyMessage}</p>
              </div>
            ) : (
              filteredOptions.map((option, index) => {
                const isSelected = option.value === value;
                const isFocused = index === focusedIndex;
                const isDisabled = option.disabled;

                return (
                  <button
                    key={String(option.value)}
                    ref={(el) => {
                      optionsRef.current[index] = el;
                    }}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    disabled={isDisabled}
                    onClick={() => handleSelect(option)}
                    className={cn(
                      "flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors",
                      isFocused && "bg-white/5 outline-none",
                      isSelected && "bg-accent-600/10 text-accent-600",
                      !isSelected &&
                        !isFocused &&
                        "text-gray-100 hover:bg-white/5",
                      isDisabled &&
                        "cursor-not-allowed opacity-50 hover:bg-transparent",
                    )}
                    onMouseEnter={() => setFocusedIndex(index)}
                  >
                    {option.icon && (
                      <div className="shrink-0 text-gray-300">
                        {option.icon}
                      </div>
                    )}
                    {renderOption ? (
                      renderOption(option)
                    ) : (
                      <span className="flex-1 font-medium">{option.label}</span>
                    )}
                    {isSelected && (
                      <div className="size-1.5 shrink-0 rounded-full bg-accent-600" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
      {error && <p className="mt-1.5 text-sm text-red">{error}</p>}
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-gray-300">{helperText}</p>
      )}
    </div>
  );
};

export default LinearDropdown;
