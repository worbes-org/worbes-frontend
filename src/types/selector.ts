export type ListSelectorOption<TValue, TMetadata = unknown> = {
  label: string;
  value: TValue;
  children?: ListSelectorOption<TValue, TMetadata>[];
  metadata?: TMetadata;
};
