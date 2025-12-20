import AuctionFilterMenuTrigger from "@/components/AuctionFilterMenuTrigger";
import AuctionTable from "@/components/AuctionTable";
import Button from "@/components/Button";
import CategoryMenuTrigger from "@/components/CategoryMenuTrigger";
import Input from "@/components/Input";
import Translation from "@/components/Translation";
import useInfiniteAuctions from "@/hooks/useInfiniteAuctions";
import { useSettingsContext } from "@/hooks/useSettingsContext";
import { useTranslations } from "@/hooks/useTranslations";
import { AuctionsFilter } from "@/types/auction";
import { CategorySelection } from "@/types/category";
import { Nullable } from "@/types/misc";
import { cn } from "@/utils/styles";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { FC, FormEvent, useState } from "react";

type Props = {
  className?: string;
  filter: AuctionsFilter;
  categorySelection: Nullable<CategorySelection>;
  onFilterChange: (filter: AuctionsFilter) => void;
  onCategoryChange: (categorySelection: CategorySelection) => void;
};

const AuctionTableContainer: FC<Props> = ({
  className,
  filter,
  categorySelection,
  onFilterChange,
  onCategoryChange,
}) => {
  const t = useTranslations();
  const {
    settings: { realm },
  } = useSettingsContext();

  const [searchQuery, setSearchQuery] = useState<string>("");

  const {
    data: auctions = [],
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteAuctions({
    filter,
    initialPagination: {
      page: 0,
      size: 30,
    },
  });

  return (
    <div
      className={cn(
        "flex flex-col [--auction-table-details-height:10rem] md:[--auction-table-details-height:4rem]",
        className,
      )}
    >
      <div className="flex h-(--auction-table-details-height) shrink-0 flex-col gap-y-2 md:justify-between">
        <CategoryMenuTrigger
          className="md:hidden"
          value={categorySelection}
          onChange={onCategoryChange}
        />

        <div className="flex justify-between gap-y-4 not-md:flex-col-reverse">
          <div>
            <Translation
              messageKey="Search Results: {count}"
              values={{ count: auctions.length }}
              as="p"
            />
            <Translation
              className="text-sm text-gray-400"
              messageKey="Last updated: {date}"
              // TODO: use correct time value from the API
              values={{ date: 1234 }}
            />
          </div>

          <form className="flex gap-x-2" onSubmit={handleSearchClick}>
            <Input
              size="md"
              placeholder={t("Search by name")}
              leftIcon={<MagnifyingGlassIcon />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
      </div>

      {!realm ? (
        <div>No realm selected</div>
      ) : (
        <AuctionTable
          className="h-[calc(100%-var(--auction-table-details-height))]"
          values={auctions}
          realm={realm}
          isLoading={isLoading || isFetchingNextPage}
          onLastVisible={fetchNextPage}
        />
      )}
    </div>
  );

  function handleSearchClick(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onFilterChange({
      ...filter,
      name: searchQuery,
    });
  }
};

export default AuctionTableContainer;
