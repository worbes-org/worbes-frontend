"use client";

import AuctionTable from "@/components/AuctionTable";
import BlockSection from "@/components/BlockSection";
import CategorySelector from "@/components/CategorySelector";
import CategorySelectorPanel from "@/components/CategorySelectorPanel";
import FilterDialogContainer from "@/components/FilterDialogContainer";
import HomeBackground from "@/components/HomeBackground";
import Input from "@/components/Input";
import LayoutContainer from "@/components/LayoutContainer";
import RealmSelector from "@/components/RealmSelector";
import RegionSelector from "@/components/RegionSelector";
import Translation from "@/components/Translation";
import { useCategorySelection } from "@/hooks/useCategorySelection";
import { useInfiniteAuctions } from "@/hooks/useInfiniteAuctions";
import { useSelectedRealm } from "@/hooks/useSelectedRealm";
import { useSelectedRegion } from "@/hooks/useSelectedRegion";
import { useTranslations } from "@/hooks/useTranslations";
import { cn } from "@/utils/styles";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FC } from "react";

type Props = {
  className?: string;
};

const AuctionBrowseSection: FC<Props> = ({ className }) => {
  const t = useTranslations();

  const [selectedRegion] = useSelectedRegion();
  const [selectedRealm] = useSelectedRealm();

  const [categorySelection, setCategorySelection] = useCategorySelection();

  const {
    data: auctions = [],
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteAuctions({
    filters: {
      region: selectedRegion,
      realmId: selectedRealm?.connectedRealmId,
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
              <FilterDialogContainer />
              <Input
                className="w-full"
                theme="primary"
                size="md"
                placeholder={t("Search by name")}
                LeftIcon={MagnifyingGlassIcon}
              />
            </div>

            <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-[1fr_auto] lg:grid-cols-1">
              <div className="flex gap-x-3">
                <RegionSelector className="flex-1" />
                <RealmSelector className="flex-1" />
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
          className="scrollbar-hide h-[60vh] overflow-auto lg:h-[75dvh]"
          values={auctions}
          isLoading={isLoading || isFetchingNextPage}
          onLastVisible={fetchNextPage}
        />
      </LayoutContainer>
    </section>
  );
};

export default AuctionBrowseSection;
