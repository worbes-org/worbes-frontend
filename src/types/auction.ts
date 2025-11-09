import { Region } from "@/constants/game-server";
import type { Maybe, Nullable } from "@/types/misc";

export type Auction = {
  uuid: string;

  itemId: number;
  itemBonus: Nullable<string>;
  itemLevel: number;
  craftingTier: Nullable<number>;
  lowestPrice: number;
  totalQuantity: number;
};

export type AuctionsFilter = {
  region: Maybe<Region>;
  realmId: Maybe<number>;
  name?: string;
  classId?: number;
  subclassId?: number;
  minQuality?: number;
  maxQuality?: number;
  minItemLevel?: number;
  maxItemLevel?: number;
  expansionId?: number;
};
