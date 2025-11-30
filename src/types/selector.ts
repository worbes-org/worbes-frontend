import { Nullable } from "@/types/misc";
import { GradientClassName } from "@/types/transition";
import { PropsWithChildren, type FC } from "react";

export type ListSelectorOption<TValue, TMetadata = unknown> = {
  label: string;
  value: TValue;
  Icon?: FC<{ className?: string }>;
  metadata?: TMetadata;
  children?: ListSelectorOption<TValue, TMetadata>[];
};

export type BaseListSelectorProps<TValue, TMetadata = unknown> = {
  className?: string;
  listClassName?: string;
  options: ListSelectorOption<TValue, TMetadata>[];
  selectedValues: Nullable<TValue>[];
  fadeGradientClassName?: GradientClassName;
  onSelect: (
    option: ListSelectorOption<TValue, TMetadata>,
    isOpen?: boolean,
  ) => void;
} & PropsWithChildren;
