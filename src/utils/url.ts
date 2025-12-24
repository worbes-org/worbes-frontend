import { Auction } from "@/types/auction";
import { Realm } from "@/types/game-server";
import { compactObject } from "@/utils/misc";
import qs from "qs";

export class AppUrlBuilder {
  static home() {
    return "/";
  }

  static auctions() {
    return "/auctions";
  }

  static auctionDetail(auction: Auction, realm: Realm) {
    const searchParams = qs.stringify(
      compactObject({
        itemBonus: auction.itemBonus?.replace(":", "_"),
      }),
    );

    return `/auctions/${auction.itemId}/realms/${realm.connectedRealmId}?${searchParams}`;
  }

  static craftingTierImage(tier: number) {
    return `/images/crafting-tiers/${tier}.png`;
  }
}
