"use client";

import { Region } from "@/constants/game-server";
import { useAuctionDetail } from "@/hooks/useAuctionDetail";
import { Nullable } from "@/types/misc";
import { WowheadItem } from "@/types/wowhead";
import { cn } from "@/utils/styles";
import { FC } from "react";

type Props = {
  className?: string;
  region: Region;
  realmId: string;
  auctionId: string;
  item: WowheadItem;
  itemBonus?: Nullable<string>;
};

const AuctionDetail: FC<Props> = ({
  className,
  region,
  realmId,
  auctionId,
  item,
  itemBonus,
}) => {
  const { data } = useAuctionDetail({ region, realmId, auctionId, itemBonus });

  return <div className={cn("", className)}></div>;
};

export default AuctionDetail;
