"use client";

import { cn } from "@/utils/styles";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  type FC,
  type ReactNode,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
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
        "w-full rounded-lg border bg-[var(--linear-bg-level1)] text-[var(--linear-text-primary)]",
        "flex items-center gap-2 cursor-pointer transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--linear-focus-ring-color)] focus-visible:ring-offset-2",
        disabled && "cursor-not-allowed opacity-50",
        isLoading && "cursor-wait",
        error
          ? "border-[var(--linear-semantic-red)]"
          : "border-[var(--linear-border-primary)]",
        !error &&
          !disabled &&
          "hover:border-[var(--linear-border-secondary)]",
        sizeClasses[size],
        triggerClassName,
      )}
    >
      {leftIcon && (
        <div className="shrink-0 text-[var(--linear-text-tertiary)]">
          {leftIcon}
        </div>
      )}
      <span
        className={cn(
          "flex-1 text-left truncate",
          !selectedOption && "text-[var(--linear-text-quaternary)]",
        )}
      >
        {selectedOption ? selectedOption.label : placeholder}
      </span>
      {rightIcon ? (
        <div className="shrink-0 text-[var(--linear-text-tertiary)]">
          {rightIcon}
        </div>
      ) : (
        <ChevronDownIcon
          className={cn(
            "size-4 shrink-0 text-[var(--linear-text-tertiary)] transition-transform",
            isOpen && "rotate-180",
          )}
        />
      )}
    </div>
  );

  return (
    <div className={cn("relative w-full", className)}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-[var(--linear-text-secondary)]">
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
            "absolute z-[1000] mt-2 w-full rounded-lg border border-[var(--linear-border-primary)] bg-[var(--linear-bg-level2)] shadow-[var(--linear-shadow-medium)] overflow-hidden",
            dropdownClassName,
          )}
          role="listbox"
        >
          {searchable && (
            <div className="border-b border-[var(--linear-border-primary)] p-2">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setFocusedIndex(-1);
                }}
                placeholder={searchPlaceholder}
                className="w-full rounded-md border border-[var(--linear-border-primary)] bg-[var(--linear-bg-level1)] px-3 py-1.5 text-sm text-[var(--linear-text-primary)] placeholder:text-[var(--linear-text-quaternary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--linear-focus-ring-color)] focus-visible:ring-offset-1"
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
                <p className="text-sm text-[var(--linear-text-tertiary)]">
                  {emptyMessage}
                </p>
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
                      "w-full px-4 py-2.5 text-left transition-colors flex items-center gap-3 text-sm",
                      isFocused &&
                        "bg-[var(--linear-bg-translucent)] outline-none",
                      isSelected &&
                        "bg-[var(--linear-accent)]/10 text-[var(--linear-accent)]",
                      !isSelected &&
                        !isFocused &&
                        "text-[var(--linear-text-primary)] hover:bg-[var(--linear-bg-translucent)]",
                      isDisabled &&
                        "opacity-50 cursor-not-allowed hover:bg-transparent",
                    )}
                    onMouseEnter={() => setFocusedIndex(index)}
                  >
                    {option.icon && (
                      <div className="shrink-0 text-[var(--linear-text-tertiary)]">
                        {option.icon}
                      </div>
                    )}
                    {renderOption ? (
                      renderOption(option)
                    ) : (
                      <span className="flex-1 font-medium">{option.label}</span>
                    )}
                    {isSelected && (
                      <div className="shrink-0 size-1.5 rounded-full bg-[var(--linear-accent)]" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
      {error && (
        <p className="mt-1.5 text-sm text-[var(--linear-semantic-red)]">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-[var(--linear-text-tertiary)]">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default LinearDropdown;

