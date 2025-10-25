export type ListSelectorOption<TValue> = {
  label: string;
  value: TValue;
  children?: ListSelectorOption<TValue>[];
};
