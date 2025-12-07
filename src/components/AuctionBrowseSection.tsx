"use client";

import CategoryListPanel from "@/components/CategoryListPanel";
import { useTranslations } from "@/hooks/useTranslations";
import { AuctionsFilter } from "@/types/auction";
import { CategorySelection } from "@/types/category";
import { Nullable } from "@/types/misc";
import { cn } from "@/utils/styles";
import { FC, useState } from "react";
import { useDebounce } from "react-use";

type Props = {
  className?: string;
};

const AuctionBrowseSection: FC<Props> = ({ className }) => {
  const t = useTranslations();

  const [categorySelection, setCategorySelection] =
    useState<Nullable<CategorySelection>>(null);

  const [restFilters, setRestFilters] = useState<
    Pick<
      AuctionsFilter,
      | "name"
      | "minQuality"
      | "maxQuality"
      | "minItemLevel"
      | "maxItemLevel"
      | "expansionId"
    >
  >({});
  const [debouncedRestFilters, setDebouncedRestFilters] = useState(restFilters);
  useDebounce(() => setDebouncedRestFilters(restFilters), 500, [restFilters]);

  return (
    <section className={cn("flex divide-x divide-gray-600", className)}>
      <CategoryListPanel
        className="size-full max-w-60"
        listClassName="scrollbar-hide overflow-y-auto py-10"
        value={categorySelection}
        onChange={setCategorySelection}
      />

      <div className="flex size-full flex-col"></div>
    </section>
  );
};

export default AuctionBrowseSection;
