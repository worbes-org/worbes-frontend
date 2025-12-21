"use client";

import { Region } from "@/constants/game-server";
import { useAuctionDetail } from "@/hooks/useAuctionDetail";
import { Nullable } from "@/types/misc";
import { cn } from "@/utils/styles";
import { FC } from "react";

type Props = {
  className?: string;
  region: Region;
  realmId: string;
  auctionId: string;
  itemBonus?: Nullable<string>;
};

const AuctionDetail: FC<Props> = ({
  className,
  region,
  realmId,
  auctionId,
  itemBonus,
}) => {
  const { data } = useAuctionDetail({ region, realmId, auctionId, itemBonus });

  return <div className={cn("", className)}></div>;
};

export default AuctionDetail;
