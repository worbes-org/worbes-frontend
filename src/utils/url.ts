import { Auction } from "@/types/auction";

export class AppUrlBuilder {
  static home() {
    return "/";
  }

  static auctions() {
    return "/auctions";
  }

  static auctionDetail(auction: Auction) {
    return `/auctions/${auction.itemId}`;
  }

  static craftingTierImage(tier: number) {
    return `/images/crafting-tiers/${tier}.png`;
  }
}
