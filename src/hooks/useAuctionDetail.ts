import { type Region } from "@/constants/game-server";
import { AuctionDetailSchema } from "@/schemas/auction";
import { Maybe, Nullable } from "@/types/misc";
import { compactObject } from "@/utils/misc";
import { useSuspenseQuery } from "@tanstack/react-query";
import qs from "qs";
import { z } from "zod";

function parseItemBonus(itemBonus: Nullable<string>) {
  const schema = z.array(z.number());
  const { data } = schema.safeParse(itemBonus);
  return data ?? [];
}

export function useAuctionDetail(args: {
  region: Region;
  realmId: string;
  auctionId: string;
  itemBonus: Maybe<string>;
}) {
  const searchParams = qs.stringify(
    compactObject({
      region: args.region,
      realmId: args.realmId,
      itemBonus: args.itemBonus ? parseItemBonus(args.itemBonus) : undefined,
    }),
  );

  const query = useSuspenseQuery({
    queryKey: ["auction-detail", args],
    queryFn: async () => {
      const response = await fetch(
        `/api/auctions/${args.auctionId}?${searchParams}`,
      );
      const data = await response.json();
      const parsed = AuctionDetailSchema.parse(data);
      return parsed;
    },
  });

  return query;
}
