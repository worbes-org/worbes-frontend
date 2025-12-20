import { Region } from "@/constants/game-server";
import { useAuctionDetail } from "@/hooks/useAuctionDetail";
import { Nullable } from "@/types/misc";
import { cn } from "@/utils/styles";
import { FC } from "react";

type Props = {
  className?: string;
  region: Region;
  realmId: number;
  itemId: number;
  itemBonus: Nullable<string>;
};

const AuctionDetail: FC<Props> = ({
  className,
  region,
  realmId,
  itemId,
  itemBonus,
}) => {
  const { data } = useAuctionDetail({ region, realmId, itemId, itemBonus });

  return <div className={cn("", className)}>AuctionDetail</div>;
};

export default AuctionDetail;
