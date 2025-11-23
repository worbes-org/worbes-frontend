import FlatListSelector from "@/components/FlatListSelector";
import NestedListSelector from "@/components/NestedListSelector";
import { BaseListSelectorProps } from "@/types/selector";

const ListSelector = <TValue extends string | number, TMetadata = unknown>({
  options,
  ...props
}: BaseListSelectorProps<TValue, TMetadata>) => {
  const isNested = options.some((option) => option.children);

  return isNested ? (
    <NestedListSelector options={options} {...props} />
  ) : (
    <FlatListSelector options={options} {...props} />
  );
};

export default ListSelector;
