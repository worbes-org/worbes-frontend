"use client";

import AuctionTableContainer from "@/components/AuctionTableContainer";
import CategoryListPanel from "@/components/CategoryListPanel";
import { useSettingsContext } from "@/hooks/useSettingsContext";
import { AuctionsFilter } from "@/types/auction";
import { CategorySelection } from "@/types/category";
import { Nullable } from "@/types/misc";
import { cn } from "@/utils/styles";
import { FC, useEffect, useState } from "react";

type Props = {
  className?: string;
};

const AuctionBrowseSection: FC<Props> = ({ className }) => {
  const [categorySelection, setCategorySelection] =
    useState<Nullable<CategorySelection>>(null);
  const {
    settings: { region: selectedRegion, realm: selectedRealm },
  } = useSettingsContext();

  const [filter, setFilter] = useState<AuctionsFilter>({
    name: "",
    region: selectedRegion,
    realmId: selectedRealm?.connectedRealmId,
    ...categorySelection,
  });

  useEffect(() => {
    setFilter({
      ...filter,
      region: selectedRegion,
      realmId: selectedRealm?.connectedRealmId,
    });
  }, [selectedRegion, selectedRealm]);

  return (
    <section className={cn("flex divide-x divide-gray-600", className)}>
      <CategoryListPanel
        className="w-60 pt-3 pr-3 not-sm:hidden sm:pt-3 md:w-80"
        listClassName="scrollbar-hide overflow-y-auto pb-5"
        value={categorySelection}
        onChange={handleCategoryChange}
      />
      <AuctionTableContainer
        className="w-full pt-3 pl-3"
        filter={filter}
        categorySelection={categorySelection}
        onFilterChange={setFilter}
        onCategoryChange={handleCategoryChange}
      />
    </section>
  );

  function handleCategoryChange(categorySelection: CategorySelection) {
    setCategorySelection(categorySelection);
    setFilter({
      ...filter,
      ...categorySelection,
    });
  }
};

export default AuctionBrowseSection;
