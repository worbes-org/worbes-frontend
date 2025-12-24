import { AuctionsSchema } from "@/schemas/auction";
import type { AuctionsFilter } from "@/types/auction";
import { useInfiniteQuery } from "@tanstack/react-query";
import qs from "qs";

type AuctionsPagination = {
  page: number;
  size: number;
};

export function useInfiniteAuctions(args: {
  filter: AuctionsFilter;
  initialPagination: AuctionsPagination;
}) {
  const query = useInfiniteQuery({
    queryKey: ["auctions", args],
    queryFn: async ({ pageParam }) => {
      const response = await fetch(
        `/api/auctions?${qs.stringify({
          ...args.filter,
          page: pageParam,
          size: args.initialPagination.size,
        })}`,
      );
      const data = await response.json();
      const parsed = AuctionsSchema.parse(data);
      return parsed;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.pageable.pageNumber + 1;
    },
    initialPageParam: args.initialPagination.page,
    enabled: !!args.filter.region && !!args.filter.realmId,
    select: (data) => {
      const flattened = data.pages.flatMap((page) => page.content);
      return flattened;
    },
  });

  return query;
}

export default useInfiniteAuctions;
