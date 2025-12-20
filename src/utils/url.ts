import { Auction } from "@/types/auction";
import { Realm } from "@/types/game-server";
import qs from "qs";

export class AppUrlBuilder {
  static home() {
    return "/";
  }

  static auctions() {
    return "/auctions";
  }

  static auctionDetail(auction: Auction, realm: Realm) {
    return `/auctions/${auction.itemId}/realms/${realm.connectedRealmId}?${qs.stringify(
      {
        itemBonus: auction.itemBonus,
      },
    )}`;
  }

  static craftingTierImage(tier: number) {
    return `/images/crafting-tiers/${tier}.png`;
  }
}
