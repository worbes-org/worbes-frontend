import AuctionTable from "@/components/AuctionTable";
import useInfiniteAuctions from "@/hooks/useInfiniteAuctions";
import { cn } from "@/utils/styles";
import { FC } from "react";

type Props = {
  className?: string;
};

const AuctionTableContainer: FC<Props> = ({ className }) => {
  const {
    data: auctions = [],
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteAuctions({
    filters: {
      //   region: selectedRegion,
      //   realmId: selectedRealm?.connectedRealmId,
      //   classId: categorySelection?.classId,
      //   subclassId: categorySelection?.subClassId,
      //   ...debouncedRestFilters,
    },
    initialPagination: {
      page: 0,
      size: 30,
    },
  });
  return (
    <div className={cn("", className)}>
      <AuctionTable
        className="flex-1"
        values={auctions}
        isLoading={isLoading || isFetchingNextPage}
        onLastVisible={fetchNextPage}
      />
    </div>
  );
};

export default AuctionTableContainer;
