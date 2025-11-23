import { type FC } from "react";

export type ListSelectorOption<TValue, TMetadata = unknown> = {
  label: string;
  value: TValue;
  Icon?: FC<{ className?: string }>;
  metadata?: TMetadata;
  children?: ListSelectorOption<TValue, TMetadata>[];
};
