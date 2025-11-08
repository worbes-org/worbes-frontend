import type { Auction, AuctionsFilter } from "@/types/auction";
import { useInfiniteQuery } from "@tanstack/react-query";
import qs from "qs";
import { z } from "zod";

const AuctionsResponseSchema = z.object({
  content: z.array(
    z.object({
      item_id: z.number(),
      item_bonus: z.string().nullable(),
      item_level: z.number(),
      crafting_tier: z.number().nullable(),
      lowest_price: z.number(),
      total_quantity: z.number(),
    }),
  ),
  first: z.boolean(),
  last: z.boolean(),
  pageable: z.object({
    pageNumber: z.number(),
  }),
});

type AuctionsPagination = {
  page: number;
  size: number;
};

export function useInfiniteAuctions(args: {
  filters: AuctionsFilter;
  initialPagination: AuctionsPagination;
}) {
  const query = useInfiniteQuery({
    queryKey: ["auctions", args],
    queryFn: async ({ pageParam }) => {
      const response = await fetch(
        `/api/auctions?${qs.stringify({
          ...args.filters,
          page: pageParam,
          size: args.initialPagination.size,
        })}`,
      );
      const data = await response.json();
      const parsed = AuctionsResponseSchema.parse(data);

      return parsed;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.pageable.pageNumber + 1;
    },
    initialPageParam: args.initialPagination.page,
    enabled: !!args.filters.region && !!args.filters.realmId,
    select: (data) => {
      const flattened = data.pages.flatMap((page) => page.content);
      const auctions = flattened.map<Auction>((item) => ({
        uuid: crypto.randomUUID(),
        itemId: item.item_id,
        itemBonus: item.item_bonus,
        itemLevel: item.item_level,
        craftingTier: item.crafting_tier,
        lowestPrice: item.lowest_price,
        totalQuantity: item.total_quantity,
      }));

      return auctions;
    },
  });

  return query;
}

export default useInfiniteAuctions;
