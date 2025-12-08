import AuctionFilterMenuTrigger from "@/components/AuctionFilterMenuTrigger";
import AuctionTable from "@/components/AuctionTable";
import Translation from "@/components/Translation";
import useInfiniteAuctions from "@/hooks/useInfiniteAuctions";
import { AuctionsFilter } from "@/types/auction";
import { cn } from "@/utils/styles";
import { FC } from "react";

type Props = {
  className?: string;
  filter: AuctionsFilter;
  onChange: (filter: AuctionsFilter) => void;
};

const AuctionTableContainer: FC<Props> = ({ className, filter, onChange }) => {
  const {
    data: auctions = [],
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteAuctions({
    filter: {
      ...filter,
    },
    initialPagination: {
      page: 0,
      size: 30,
    },
  });

  return (
    <div
      className={cn(
        "flex flex-col [--auction-table-details-height:3.75rem]",
        className,
      )}
    >
      <div className="flex h-(--auction-table-details-height) shrink-0 justify-between">
        <div>
          <div>
            {/* TODO: use total items length */}
            <span className="text-sm text-accent-700">{auctions.length}</span>
            &nbsp;
            <Translation className="text-sm text-gray-400" messageKey="items" />
          </div>

          <Translation
            className="text-sm text-gray-400"
            messageKey="Last updated: {date}"
            // TODO: use correct time value from the API
            values={{ date: 1234 }}
          />
        </div>

        <AuctionFilterMenuTrigger
          className="self-start"
          filter={filter}
          onChange={onChange}
        />
      </div>

      <AuctionTable
        className="h-[calc(100%-var(--auction-table-details-height))]"
        values={auctions}
        isLoading={isLoading || isFetchingNextPage}
        onLastVisible={fetchNextPage}
      />
    </div>
  );
};

export default AuctionTableContainer;
