export type ListSelectorOption<TValue, TMetadata = unknown> = {
  label: string;
  value: TValue;
  metadata: TMetadata;
  children?: ListSelectorOption<TValue, TMetadata>[];
};
