import { type Region } from "@/constants/game-server";
import { AuctionDetailSchema } from "@/schemas/auction";
import { Nullable } from "@/types/misc";
import { useSuspenseQuery } from "@tanstack/react-query";
import qs from "qs";

export function useAuctionDetail(args: {
  region: Region;
  realmId: number;
  itemId: number;
  itemBonus: Nullable<string>;
}) {
  const query = useSuspenseQuery({
    queryKey: ["auction-detail", args],
    queryFn: async () => {
      const response = await fetch(
        `/api/auctions/${args.itemId}?${qs.stringify({
          region: args.region,
          realmId: args.realmId,
          itemBonus: [0],
        })}`,
      );
      const data = await response.json();
      const parsed = AuctionDetailSchema.parse(data);
      return parsed;
    },
  });

  console.log(query.data);

  return query;
}
