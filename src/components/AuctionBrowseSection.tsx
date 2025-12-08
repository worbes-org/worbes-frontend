"use client";

import AuctionTableContainer from "@/components/AuctionTableContainer";
import Button from "@/components/Button";
import CategoryListPanel from "@/components/CategoryListPanel";
import Input from "@/components/Input";
import Translation from "@/components/Translation";
import { useSettingsContext } from "@/hooks/useSettingsContext";
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
  const {
    settings: { region: selectedRegion, realm: selectedRealm },
  } = useSettingsContext();

  const [filter, setFilter] = useState<AuctionsFilter>({
    region: selectedRegion,
    realmId: selectedRealm?.connectedRealmId,
    ...categorySelection,
  });

  return (
    <section className={cn("flex divide-x divide-gray-600", className)}>
      <div className="flex w-100 flex-col pt-6 pr-3 [--auction-filter-input-height:2.5rem]">
        <div className="flex h-(--auction-filter-input-height) gap-x-2">
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
          className="h-[calc(100%-var(--auction-filter-input-height))]"
          listClassName="scrollbar-hide overflow-y-auto py-5"
          value={categorySelection}
          onChange={setCategorySelection}
        />
      </div>

      <AuctionTableContainer
        className="flex-1 pt-6 pl-3"
        filter={filter}
        onChange={setFilter}
      />
    </section>
  );

  function handleSearch() {
    setFilter({ ...filter, name: searchQuery });
  }
};

export default AuctionBrowseSection;
