import FlatListSelector from "@/components/FlatListSelector";
import NestedListSelector from "@/components/NestedListSelector";
import Translation from "@/components/Translation";
import { BaseListSelectorProps } from "@/types/selector";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const ListSelector = <TValue extends string | number, TMetadata = unknown>({
  options,
  ...props
}: BaseListSelectorProps<TValue, TMetadata>) => {
  const isNested = options.some((option) => option.children);

  return isNested ? (
    <NestedListSelector
      options={options}
      renderEmpty={EmptyFallback}
      {...props}
    />
  ) : (
    <FlatListSelector
      options={options}
      renderEmpty={EmptyFallback}
      {...props}
    />
  );
};

const EmptyFallback = () => {
  return (
    <div className="flex items-center justify-center gap-x-2 py-8">
      <ExclamationTriangleIcon className="size-6 stroke-2 text-gray-400" />
      <Translation
        className="text-sm text-gray-400"
        messageKey="No options found..."
        as="p"
      />
    </div>
  );
};

export default ListSelector;
