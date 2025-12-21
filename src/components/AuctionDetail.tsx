"use client";

import { useAuctionDetail } from "@/hooks/useAuctionDetail";
import { useSettingsContext } from "@/hooks/useSettingsContext";
import { Nullable } from "@/types/misc";
import { WowheadItem } from "@/types/wowhead";
import { cn } from "@/utils/styles";
import { FC } from "react";

type Props = {
  className?: string;
  realmId: string;
  auctionId: string;
  item: WowheadItem;
  itemBonus?: Nullable<string>;
};

const AuctionDetail: FC<Props> = ({
  className,
  realmId,
  auctionId,
  item,
  itemBonus,
}) => {
  const {
    settings: { region },
  } = useSettingsContext();
  const { data } = useAuctionDetail({ region, realmId, auctionId, itemBonus });

  return <div className={cn("", className)}></div>;
};

export const AuctionDetailSkeleton: FC<{ className?: string }> = ({
  className,
}) => {
  return <div className={cn("", className)}>Loading...</div>;
};

export default AuctionDetail;
