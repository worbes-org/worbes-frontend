"use client";

import AuctionFilterMenuTrigger from "@/components/AuctionFilterMenuTrigger";
import AuctionTableContainer from "@/components/AuctionTableContainer";
import Button from "@/components/Button";
import CategoryListPanel from "@/components/CategoryListPanel";
import CategoryMenuTrigger from "@/components/CategoryMenuTrigger";
import Input from "@/components/Input";
import Translation from "@/components/Translation";
import { useSettingsContext } from "@/hooks/useSettingsContext";
import { useTranslations } from "@/hooks/useTranslations";
import { AuctionsFilter } from "@/types/auction";
import { CategorySelection } from "@/types/category";
import { Nullable } from "@/types/misc";
import { cn } from "@/utils/styles";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FC, FormEvent, useEffect, useState } from "react";

type Props = {
  className?: string;
};

const AuctionBrowseSection: FC<Props> = ({ className }) => {
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

  useEffect(() => {
    setFilter({
      ...filter,
      ...categorySelection,
      region: selectedRegion,
      realmId: selectedRealm?.connectedRealmId,
    });
  }, [selectedRegion, selectedRealm]);

  return (
    <section className={cn("flex divide-x divide-gray-600", className)}>
      <DesktopFilterSection
        className="pt-3 pr-3 not-sm:hidden sm:pt-6"
        searchQuery={searchQuery}
        categorySelection={categorySelection}
        onCategoryChange={setCategorySelection}
        onSearchQueryChange={setSearchQuery}
        onSearch={handleSearch}
      />

      <div className="flex flex-1 flex-col pt-3 pl-3 [--auction-filter-height:6.5rem] sm:pt-6">
        <MobileFilterSection
          className="h-(--auction-filter-height) shrink-0 sm:hidden"
          filter={filter}
          searchQuery={searchQuery}
          categorySelection={categorySelection}
          onFilterChange={setFilter}
          onCategoryChange={setCategorySelection}
          onSearchQueryChange={setSearchQuery}
          onSearch={handleSearch}
        />
        <AuctionTableContainer
          className="h-[calc(100%-var(--auction-filter-height))]"
          filter={filter}
          onChange={setFilter}
        />
      </div>
    </section>
  );

  function handleSearch() {
    setFilter({ ...filter, ...categorySelection, name: searchQuery });
  }
};

const DesktopFilterSection: FC<{
  className?: string;
  searchQuery: string;
  categorySelection: Nullable<CategorySelection>;
  onSearchQueryChange: (value: string) => void;
  onCategoryChange: (value: CategorySelection) => void;
  onSearch: () => void;
}> = ({
  className,
  searchQuery,
  categorySelection,
  onCategoryChange,
  onSearchQueryChange,
  onSearch,
}) => {
  const t = useTranslations();

  return (
    <div
      className={cn(
        "flex w-80 flex-col [--auction-filter-form-height:2.5rem]",
        className,
      )}
    >
      <form
        className="flex h-(--auction-filter-form-height) gap-x-2"
        onSubmit={handleSearchClick}
      >
        <Input
          size="md"
          placeholder={t("Search by name")}
          leftIcon={<MagnifyingGlassIcon />}
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
        />
        <Button theme="quaternary" size="md" type="submit">
          <Translation messageKey="Search" />
        </Button>
      </form>

      <CategoryListPanel
        className="h-[calc(100%-var(--auction-filter-form-height))]"
        listClassName="scrollbar-hide overflow-y-auto py-5"
        value={categorySelection}
        onChange={onCategoryChange}
      />
    </div>
  );

  function handleSearchClick(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSearch();
  }
};

const MobileFilterSection: FC<{
  className?: string;
  filter: AuctionsFilter;
  searchQuery: string;
  categorySelection: Nullable<CategorySelection>;
  onFilterChange: (value: AuctionsFilter) => void;
  onSearchQueryChange: (value: string) => void;
  onCategoryChange: (value: CategorySelection) => void;
  onSearch: () => void;
}> = ({
  className,
  filter,
  searchQuery,
  categorySelection,
  onFilterChange,
  onCategoryChange,
  onSearchQueryChange,
  onSearch,
}) => {
  const t = useTranslations();

  return (
    <div className={cn("space-y-2", className)}>
      <CategoryMenuTrigger
        value={categorySelection}
        onChange={onCategoryChange}
      />

      <form className="flex gap-x-2" onSubmit={handleSearchClick}>
        <Input
          size="md"
          placeholder={t("Search by name")}
          leftIcon={<MagnifyingGlassIcon />}
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
        />
        <AuctionFilterMenuTrigger
          className="self-start"
          filter={filter}
          onChange={onFilterChange}
        />
        <Button theme="quaternary" size="md" type="submit">
          <Translation messageKey="Search" />
        </Button>
      </form>
    </div>
  );

  function handleSearchClick(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSearch();
  }
};

export default AuctionBrowseSection;
