"use client";

import AuctionsFilterDialogContainer from "@/components/AuctionsFilterDialogContainer";
import AuctionTable from "@/components/AuctionTable";
import BlockSection from "@/components/BlockSection";
import CategorySelector from "@/components/CategorySelector";
import CategorySelectorPanel from "@/components/CategorySelectorPanel";
import HomeBackground from "@/components/HomeBackground";
import Input from "@/components/Input";
import LayoutContainer from "@/components/LayoutContainer";
import RealmSelector from "@/components/RealmSelector";
import RegionSelector from "@/components/RegionSelector";
import Translation from "@/components/Translation";
import { useInfiniteAuctions } from "@/hooks/useInfiniteAuctions";
import { useSelectedRealm } from "@/hooks/useSelectedRealm";
import { useSelectedRegion } from "@/hooks/useSelectedRegion";
import { useTranslations } from "@/hooks/useTranslations";
import { AuctionsFilter } from "@/types/auction";
import { CategorySelection } from "@/types/category";
import { Nullable } from "@/types/misc";
import { cn } from "@/utils/styles";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, FC, useState } from "react";
import { useDebounce } from "react-use";

type Props = {
  className?: string;
};

const AuctionBrowseSection: FC<Props> = ({ className }) => {
  const t = useTranslations();

  const [selectedRegion, setSelectedRegion] = useSelectedRegion();
  const [selectedRealm, setSelectedRealm] = useSelectedRealm();
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

  const {
    data: auctions = [],
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteAuctions({
    filters: {
      region: selectedRegion,
      realmId: selectedRealm?.connectedRealmId,
      classId: categorySelection?.classId,
      subclassId: categorySelection?.subClassId,
      ...debouncedRestFilters,
    },
    initialPagination: {
      page: 0,
      size: 30,
    },
  });

  return (
    <section className={cn("", className)}>
      <div className="relative h-85 w-full py-13 sm:h-65 lg:h-55">
        <HomeBackground className="absolute inset-0 -z-10 h-full" />
        <LayoutContainer className="space-y-6">
          <Translation
            className="text-2xl font-bold text-green-300"
            as="h1"
            messageKey="Track prices and availability across realms."
          />

          <div className="flex gap-3 not-lg:flex-col">
            <div className="flex gap-x-2 not-lg:order-last md:min-w-lg">
              <AuctionsFilterDialogContainer
                filter={restFilters}
                onChange={handleFilterChange}
              />
              <Input
                className="w-full"
                size="md"
                placeholder={t("Search by name")}
                leftIcon={<MagnifyingGlassIcon />}
                value={restFilters.name ?? ""}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-[1fr_auto] lg:grid-cols-1">
              <div className="flex gap-x-3">
                <RegionSelector
                  className="flex-1"
                  value={selectedRegion}
                  onChange={setSelectedRegion}
                />
                <RealmSelector
                  className="flex-1"
                  region={selectedRegion}
                  value={selectedRealm}
                  onChange={setSelectedRealm}
                />
              </div>
              <CategorySelector
                className="lg:hidden"
                value={categorySelection}
                onChange={setCategorySelection}
              />
            </div>
          </div>
        </LayoutContainer>
      </div>

      <LayoutContainer className="relative grid grid-cols-1 gap-x-6 lg:grid-cols-[15rem_1fr]">
        <BlockSection className="h-156 not-lg:hidden">
          <CategorySelectorPanel
            className="scrollbar-hide h-full overflow-y-auto"
            value={categorySelection}
            onChange={setCategorySelection}
          />
        </BlockSection>

        <AuctionTable
          className="scrollbar-hide h-[60vh] overflow-auto lg:h-[calc(max(75dvh,39rem))]"
          values={auctions}
          isLoading={isLoading || isFetchingNextPage}
          onLastVisible={fetchNextPage}
        />
      </LayoutContainer>
    </section>
  );

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setRestFilters((prev) => ({ ...prev, name: event.target.value }));
  }

  function handleFilterChange(newFilter: Partial<AuctionsFilter>) {
    setRestFilters((prev) => ({ ...prev, ...newFilter }));
  }
};

export default AuctionBrowseSection;
