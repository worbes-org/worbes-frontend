import { type Region } from "@/constants/game-server";
import { AuctionHistorySchema } from "@/schemas/auction";
import { Maybe, Nullable, Timeframe } from "@/types/misc";
import { compactObject } from "@/utils/misc";
import { useSuspenseQuery } from "@tanstack/react-query";
import qs from "qs";
import { z } from "zod";

export function useAuctionHistory(args: {
  region: Region;
  realmId: string;
  auctionId: string;
  timeframe: Timeframe;
  itemBonus: Maybe<string>;
}) {
  const searchParams = qs.stringify(
    compactObject({
      region: args.region,
      realmId: args.realmId,
      itemBonus: args.itemBonus ? parseItemBonus(args.itemBonus) : undefined,
      days: getDays(args.timeframe),
    }),
  );

  const query = useSuspenseQuery({
    queryKey: ["auction-history", args],
    queryFn: async () => {
      const response = await fetch(
        `/api/auctions/${args.auctionId}/history?${searchParams}`,
      );
      const data = await response.json();
      const parsed = AuctionHistorySchema.parse(data);
      return parsed;
    },
  });

  return query;
}

function parseItemBonus(itemBonus: Nullable<string>) {
  const schema = z.array(z.number());
  const { data } = schema.safeParse(itemBonus);
  return data ?? [];
}

function getDays(timeframe: Timeframe) {
  switch (timeframe) {
    case Timeframe.ONE_WEEK:
      return 7;
    case Timeframe.TWO_WEEKS:
      return 14;
    case Timeframe.ONE_MONTH:
      return 30;
  }
}
