import { Region } from "@/constants/game-server";
import {
  AuctionDetailSchema,
  AuctionHistorySchema,
  AuctionsSchema,
} from "@/schemas/auction";
import type { Maybe } from "@/types/misc";
import { z } from "zod";

export type Auction = z.infer<typeof AuctionsSchema>["content"][number];

export type AuctionDetail = z.infer<typeof AuctionDetailSchema>;

export type AuctionHistory = z.infer<typeof AuctionHistorySchema>;

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
