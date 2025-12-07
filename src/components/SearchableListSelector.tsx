import Input from "@/components/Input";
import ListSelector from "@/components/ListSelector";
import { BaseListSelectorProps } from "@/types/selector";
import { cn } from "@/utils/styles";
import { ComponentProps, useState } from "react";
import { useDebounce } from "react-use";

type Props<TValue, TMetadata = unknown> = {
  className?: string;
  input: Pick<
    ComponentProps<typeof Input>,
    | "className"
    | "size"
    | "autoFocus"
    | "placeholder"
    | "leftIcon"
    | "rightIcon"
    | "isLoading"
  >;
  selector: BaseListSelectorProps<TValue, TMetadata>;
};

const SearchableListSelector = <
  TValue extends string | number,
  TMetadata = unknown,
>({
  className,
  input,
  selector,
}: Props<TValue, TMetadata>) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  useDebounce(() => setDebouncedSearchQuery(searchQuery), 500, [searchQuery]);

  const filteredOptions = selector.options.filter((option) =>
    new RegExp(debouncedSearchQuery, "i").test(option.label),
  );

  return (
    <div className={cn("", className)}>
      <Input
        {...input}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ListSelector {...selector} options={filteredOptions} />
    </div>
  );
};

export default SearchableListSelector;
