import type { Nullable } from "@/types/misc";

export type Auction = {
  uuid: string;

  itemId: number;
  itemBonus: Nullable<string>;
  itemLevel: number;
  craftingTier: Nullable<number>;
  lowestPrice: number;
  totalQuantity: number;
};
