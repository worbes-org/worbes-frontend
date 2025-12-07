"use client";

import Button from "@/components/Button";
import CategoryListPanel from "@/components/CategoryListPanel";
import Input from "@/components/Input";
import Translation from "@/components/Translation";
import { useTranslations } from "@/hooks/useTranslations";
import { AuctionsFilter } from "@/types/auction";
import { CategorySelection } from "@/types/category";
import { Nullable } from "@/types/misc";
import { cn } from "@/utils/styles";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FC, useState } from "react";

type Props = {
  className?: string;
};

const AuctionBrowseSection: FC<Props> = ({ className }) => {
  const t = useTranslations();

  const [searchQuery, setSearchQuery] = useState<string>("");
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

  return (
    <section className={cn("flex divide-x divide-gray-600", className)}>
      <div className="flex w-100 flex-col pt-6 pr-3 [--auction-filter-input:2.5rem]">
        <div className="flex gap-x-2">
          <Input
            size="md"
            placeholder={t("Search by name")}
            leftIcon={<MagnifyingGlassIcon />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button theme="quaternary" size="md" onClick={handleSearch}>
            <Translation messageKey="Search" />
          </Button>
        </div>

        <CategoryListPanel
          className="h-[calc(100%-var(--auction-filter-input))]"
          listClassName="scrollbar-hide overflow-y-auto py-5"
          value={categorySelection}
          onChange={setCategorySelection}
        />
      </div>

      <div className="flex size-full flex-col pl-3"></div>
    </section>
  );

  function handleSearch() {
    setRestFilters({ ...restFilters, name: searchQuery });
  }
};

export default AuctionBrowseSection;
